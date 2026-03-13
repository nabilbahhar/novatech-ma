import XLSX from 'xlsx';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ckuktpfipbxjwxztizgv.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8';

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Family -> Category mapping
const FAMILY_TO_CATEGORY = {
  'DELL PRO MICRO': 'ordinateurs',
  'DELL PC': 'ordinateurs',
  'DELL PC 7020MFF': 'ordinateurs',
  'DELL PC 7020SFF': 'ordinateurs',
  'DELL PC 7420': 'ordinateurs',
  'DELL LAPTOP': 'ordinateurs',
  'DELL LAPTOP 3450': 'ordinateurs',
  'DELL LAPTOP 7350': 'ordinateurs',
  'DELL LAPTOP XPS': 'ordinateurs',
  'DELL PRO 13 PREM': 'ordinateurs',
  'DELL PRO 13 PLUS': 'ordinateurs',
  'DELL PRO 14 PLUS': 'ordinateurs',
  'DELL PRO 14 PREM': 'ordinateurs',
  'LENOVO LAPTOP': 'ordinateurs',
  'LENOVO PC': 'ordinateurs',
  'DELL ECRAN': 'ecrans',
  'DELL MONITOR': 'ecrans',
  'PHILIPS ECRAN': 'ecrans',
  'PHILIPS MONITOR': 'ecrans',
  'JABRA': 'audio',
  'JABRA CASQUE': 'audio',
  'JABRA SPEAK': 'audio',
  'POLY': 'audio',
  'POLY CASQUE': 'audio',
  'DELL SAC': 'bagagerie',
  'DELL SACOCHE': 'bagagerie',
  'DELL BACKPACK': 'bagagerie',
  'CISCO': 'reseau',
  'DELL DOCK': 'accessoires',
  'DELL DOCKING': 'accessoires',
  'DELL CLAVIER': 'accessoires',
  'DELL SOURIS': 'accessoires',
  'DELL MOUSE': 'accessoires',
  'DELL KEYBOARD': 'accessoires',
  'DELL ADAPTATEUR': 'accessoires',
  'DELL WEBCAM': 'accessoires',
  'CANON': 'impression',
  'HP': 'impression',
};

function detectBrand(sku, family, title) {
  const text = `${sku} ${family} ${title}`.toUpperCase();
  if (text.includes('DELL')) return 'Dell';
  if (text.includes('JABRA')) return 'Jabra';
  if (text.includes('LENOVO')) return 'Lenovo';
  if (text.includes('PHILIPS')) return 'Philips';
  if (text.includes('CISCO')) return 'Cisco';
  if (text.includes('POLY')) return 'Poly';
  if (text.includes('CANON')) return 'Canon';
  if (text.includes('HP')) return 'HP';
  return 'Autre';
}

function detectCategory(family) {
  if (!family) return 'accessoires';
  const fam = family.toUpperCase().trim();

  // Direct match
  if (FAMILY_TO_CATEGORY[fam]) return FAMILY_TO_CATEGORY[fam];

  // Partial match
  for (const [key, cat] of Object.entries(FAMILY_TO_CATEGORY)) {
    if (fam.includes(key) || key.includes(fam)) return cat;
  }

  // Keyword-based
  if (fam.includes('LAPTOP') || fam.includes('PC') || fam.includes('MICRO') || fam.includes('PRO 1')) return 'ordinateurs';
  if (fam.includes('ECRAN') || fam.includes('MONITOR')) return 'ecrans';
  if (fam.includes('CASQUE') || fam.includes('SPEAK') || fam.includes('AUDIO') || fam.includes('JABRA') || fam.includes('POLY')) return 'audio';
  if (fam.includes('SAC') || fam.includes('BACKPACK') || fam.includes('SLIM') || fam.includes('ROLLER')) return 'bagagerie';
  if (fam.includes('DOCK') || fam.includes('CLAVIER') || fam.includes('SOURIS') || fam.includes('MOUSE') || fam.includes('ADAPT') || fam.includes('USB') || fam.includes('WEBCAM')) return 'accessoires';
  if (fam.includes('CISCO') || fam.includes('SWITCH') || fam.includes('AP ')) return 'reseau';
  if (fam.includes('IMPRIM') || fam.includes('TONER') || fam.includes('CANON') || fam.includes('HP ')) return 'impression';

  return 'accessoires';
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 240);
}

function computePrice(title) {
  // Simple pricing based on product type
  const t = title.toUpperCase();
  let basePrice;

  if (t.includes('XPS') || t.includes('PREMIUM') || t.includes('PREM')) basePrice = 18000;
  else if (t.includes('LAPTOP') || t.includes('PRO 14') || t.includes('PRO 13')) basePrice = 12000;
  else if (t.includes('AIO') || t.includes('ALL IN ONE') || t.includes('7420')) basePrice = 14000;
  else if (t.includes('MICRO') || t.includes('MFF') || t.includes('SFF')) basePrice = 8500;
  else if (t.includes('THINKBOOK') || t.includes('LENOVO')) basePrice = 9500;
  else if (t.includes('ECRAN') || t.includes('MONITOR') || t.includes('P24') || t.includes('P27')) basePrice = 3500;
  else if (t.includes('34') && (t.includes('ECRAN') || t.includes('CURVED'))) basePrice = 6000;
  else if (t.includes('CASQUE') || t.includes('HEADSET') || t.includes('EVOLVE')) basePrice = 2500;
  else if (t.includes('SPEAK')) basePrice = 1800;
  else if (t.includes('DOCK')) basePrice = 3200;
  else if (t.includes('SAC') || t.includes('BACKPACK') || t.includes('SACOCHE')) basePrice = 450;
  else if (t.includes('SOURIS') || t.includes('MOUSE')) basePrice = 350;
  else if (t.includes('CLAVIER') || t.includes('KEYBOARD')) basePrice = 500;
  else if (t.includes('WEBCAM')) basePrice = 1200;
  else if (t.includes('ADAPT') || t.includes('USB-C') || t.includes('DONGLE')) basePrice = 400;
  else if (t.includes('CISCO') || t.includes('SWITCH')) basePrice = 5500;
  else basePrice = 5000;

  const priceHT = Math.round(basePrice * 0.96); // 4% below benchmark
  const priceTTC = Math.round(priceHT * 1.2);
  const priceCrossed = Math.round(basePrice * 1.2);
  const economy = priceCrossed - priceTTC;

  return { priceHT, priceTTC, priceCrossed, economy, benchmark: basePrice };
}

async function main() {
  console.log('Reading Excel file...');
  const wb = XLSX.readFile('../novatech_package/data/STOCK_PHYSIQUE.xlsx');
  const ws = wb.Sheets[wb.SheetNames[0]];
  const data = XLSX.utils.sheet_to_json(ws, { header: 1 });

  const products = [];
  const seenSKUs = new Set();

  for (let i = 4; i < data.length; i++) {
    const row = data[i];
    if (!row || !row[3] || !row[4]) continue;

    const zone = row[1] || '';
    const family = row[2] || '';
    const sku = String(row[3]).trim();
    const designation = String(row[4]).trim();
    const stockQty = parseInt(row[5]) || 0;
    const stockIncoming = parseInt(row[6]) || 0;

    if (seenSKUs.has(sku)) continue;
    seenSKUs.add(sku);

    const brand = detectBrand(sku, family, designation);
    const category = detectCategory(family);
    const slug = slugify(`${brand}-${designation}-${sku}`.slice(0, 200));
    const { priceHT, priceTTC, priceCrossed, economy, benchmark } = computePrice(designation);

    products.push({
      sku,
      brand,
      category,
      subcategory: family.trim(),
      family_raw: family.trim(),
      warehouse_zone: zone.trim(),
      title_raw: designation,
      title_commercial: designation,
      slug,
      description_short: `${brand} ${designation} - Disponible chez NOVATECH.MA avec livraison partout au Maroc`,
      stock_qty: stockQty,
      stock_incoming: stockIncoming,
      price_benchmark: benchmark,
      price_ht: priceHT,
      price_ttc: priceTTC,
      price_crossed: priceCrossed,
      price_economy: economy,
      tva_rate: 20.0,
      badge_best_price: true,
      badge_new: i < 30, // First products are newest
      status: 'published',
      is_published: true,
      seo_title: `${designation} | Prix Maroc | NOVATECH.MA`,
      seo_description: `Achetez ${designation} au meilleur prix au Maroc. Livraison 24-48h. Stock garanti. Devis entreprise disponible.`,
    });
  }

  console.log(`Prepared ${products.length} products for import`);

  // Insert in batches of 50
  const batchSize = 50;
  let imported = 0;
  let errors = 0;

  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);
    const { data: result, error } = await supabase
      .from('products')
      .upsert(batch, { onConflict: 'sku' });

    if (error) {
      console.error(`Batch ${i / batchSize + 1} error:`, error.message);
      errors += batch.length;
    } else {
      imported += batch.length;
      console.log(`Batch ${Math.floor(i / batchSize) + 1}: ${batch.length} products imported`);
    }
  }

  console.log(`\n=== IMPORT COMPLETE ===`);
  console.log(`Total: ${products.length} | Imported: ${imported} | Errors: ${errors}`);

  // Verify
  const { count } = await supabase.from('products').select('*', { count: 'exact', head: true });
  console.log(`Products in DB: ${count}`);
}

main().catch(console.error);
