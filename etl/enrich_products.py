"""
NOVATECH.MA — ETL: Enrichissement produits + récupération images
Fichier: etl/enrich_products.py

Ce script tourne après sync_stock.py pour:
1. Récupérer les vraies images produits depuis les APIs fabricants
2. Vérifier que l'image Dell existe (statut 200)
3. Fallback: Bing Image Search API
4. Upload sur Cloudinary pour CDN optimisé
5. Générer les titres commerciaux enrichis

Usage:
  python enrich_products.py              # enrichir tous les drafts
  python enrich_products.py --limit 20   # enrichir 20 produits
"""

import os
import re
import time
import logging
import argparse
import requests
from supabase import create_client, Client
from dotenv import load_dotenv

load_dotenv()
log = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")

SUPABASE_URL  = os.environ["SUPABASE_URL"]
SUPABASE_KEY  = os.environ["SUPABASE_SERVICE_KEY"]
CLOUDINARY_URL = os.environ.get("CLOUDINARY_URL", "")  # cloudinary://api_key:api_secret@cloud_name
BING_API_KEY  = os.environ.get("BING_IMAGE_SEARCH_KEY", "")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)


def check_image_url(url: str) -> bool:
    """Vérifie qu'une URL image répond avec status 200"""
    try:
        r = requests.head(url, timeout=8, allow_redirects=True)
        return r.status_code == 200 and "image" in r.headers.get("content-type", "")
    except:
        return False


def get_dell_image(sku: str) -> str | None:
    """Tentative image via Dell CDN"""
    # Format 1: Direct CDN
    url1 = f"https://i.dell.com/is/image/DellContent/{sku}?fmt=jpg&wid=500"
    if check_image_url(url1):
        return url1
    # Format 2: Variante minuscules
    url2 = f"https://i.dell.com/is/image/DellContent/{sku.lower()}?fmt=jpg&wid=500"
    if check_image_url(url2):
        return url2
    return None


def get_jabra_image(sku: str, title: str) -> str | None:
    """Images Jabra via leur CDN public"""
    # Jabra expose ses images via leur API publique
    # Format: https://www.jabra.com/~/media/Images/Products/{product-name}/
    # On cherche via leur search API
    try:
        search_url = f"https://www.jabra.com/api/products/search?query={requests.utils.quote(title)}&top=1"
        r = requests.get(search_url, timeout=8)
        if r.status_code == 200:
            data = r.json()
            if data.get("products"):
                return data["products"][0].get("imageUrl")
    except:
        pass
    return None


def bing_image_search(query: str) -> str | None:
    """Fallback: Bing Image Search API"""
    if not BING_API_KEY:
        return None
    try:
        r = requests.get(
            "https://api.bing.microsoft.com/v7.0/images/search",
            headers={"Ocp-Apim-Subscription-Key": BING_API_KEY},
            params={
                "q": f"{query} product image white background official",
                "count": 3,
                "imageType": "Product",
                "license": "Any",
                "safeSearch": "Strict",
            },
            timeout=10,
        )
        if r.status_code == 200:
            results = r.json().get("value", [])
            if results:
                # Préférer les images en fond blanc
                for img in results:
                    if img.get("thumbnail", {}).get("width", 0) >= 300:
                        return img.get("contentUrl")
    except Exception as e:
        log.warning(f"Bing search failed: {e}")
    return None


def upload_to_cloudinary(image_url: str, public_id: str) -> str | None:
    """Upload image vers Cloudinary pour CDN optimisé"""
    if not CLOUDINARY_URL:
        return image_url  # retourner URL directe si pas de Cloudinary
    try:
        import cloudinary
        import cloudinary.uploader
        cloudinary.config(cloudinary_url=CLOUDINARY_URL)
        result = cloudinary.uploader.upload(
            image_url,
            public_id=f"products/{public_id}",
            overwrite=False,
            transformation=[
                {"width": 600, "height": 600, "crop": "pad", "background": "white"},
                {"format": "webp", "quality": "auto:good"},
            ],
        )
        return result.get("secure_url")
    except Exception as e:
        log.warning(f"Cloudinary upload failed: {e}")
        return image_url


def generate_seo_description(title: str, brand: str, category: str, stock_qty: int) -> dict:
    """Génère description SEO depuis données produit"""
    avail = "En stock" if stock_qty > 0 else "Disponible bientôt"
    desc_short = f"{title} — {avail} au Maroc. Livraison rapide partout au Maroc. Paiement à la livraison."
    seo_title = f"{title} — Meilleur Prix Maroc | NOVATECH.MA"
    seo_desc = (
        f"Achetez {title} au meilleur prix au Maroc sur NOVATECH.MA. "
        f"Stock vérifié · Livraison 24-48h · Paiement à la livraison · Devis entreprise disponible."
    )
    return {
        "description_short": desc_short,
        "seo_title": seo_title[:70],
        "seo_description": seo_desc[:160],
    }


def enrich(limit: int = 50):
    log.info(f"Démarrage enrichissement (limit={limit})")

    # Récupérer produits sans image ou sans description
    products = supabase.table("products").select(
        "id,sku,brand,title_commercial,category,stock_qty,image_main,description_short,status"
    ).or_("image_main.is.null,description_short.is.null").eq(
        "status", "draft"
    ).limit(limit).execute()

    if not products.data:
        log.info("Aucun produit à enrichir")
        return

    log.info(f"{len(products.data)} produits à enrichir")

    for p in products.data:
        pid    = p["id"]
        sku    = p["sku"]
        brand  = p.get("brand", "")
        title  = p.get("title_commercial", "")
        cat    = p.get("category", "")
        sq     = p.get("stock_qty", 0)
        update = {}

        # ── Images ────────────────────────────────────────────────────────
        if not p.get("image_main"):
            img_url = None

            if brand.lower() == "dell":
                img_url = get_dell_image(sku)
            elif brand.lower() == "jabra":
                img_url = get_jabra_image(sku, title)

            # Fallback Bing
            if not img_url:
                img_url = bing_image_search(f"{brand} {title}")

            if img_url:
                # Upload Cloudinary
                cdn_url = upload_to_cloudinary(img_url, f"{brand.lower()}-{sku}")
                update["image_main"]   = cdn_url
                update["image_source"] = "cloudinary"
                update["image_gallery"] = [cdn_url]
                log.info(f"  ✓ Image: {sku} → {cdn_url[:60]}...")
            else:
                log.warning(f"  ✗ Pas d'image trouvée pour {sku}")

        # ── SEO + Description ──────────────────────────────────────────────
        if not p.get("description_short"):
            seo = generate_seo_description(title, brand, cat, sq)
            update.update(seo)

        # ── Score de complétude ────────────────────────────────────────────
        score = 0
        if update.get("image_main") or p.get("image_main"):  score += 40
        if update.get("description_short") or p.get("description_short"): score += 20
        if update.get("seo_title"):          score += 20
        if title:                            score += 20
        update["completeness_score"] = score

        # Auto-publish si score >= 60
        if score >= 60:
            update["status"]       = "published"
            update["is_published"] = True

        if update:
            try:
                supabase.table("products").update(update).eq("id", pid).execute()
                log.info(f"  ✓ Enrichi: {sku} (score={score})")
            except Exception as e:
                log.error(f"  ✗ Update failed {sku}: {e}")

        time.sleep(0.3)  # rate limit API

    log.info("✅ Enrichissement terminé")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--limit", type=int, default=50)
    args = parser.parse_args()
    enrich(limit=args.limit)
