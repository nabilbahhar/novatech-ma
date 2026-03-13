import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

function cdw(id) {
  return `https://webobjects2.cdw.com/is/image/CDW/${id}?$product-detail$`;
}

const IMAGE_MAP = {
  // === CABLES ===
  // HDMI cable 3M (product 184) - CDW 2831347 (StarTech 10ft HDMI 4K)
  184: cdw(2831347),
  // HDMI 4K 10M (product 183) - CDW 2831347
  183: cdw(2831347),
  // HDMI/HDMI 3m (product 240) - CDW 2831347
  240: cdw(2831347),
  // Cable Type C/USB (product 185) - CDW 3787646 (Tripp Lite USB-C to USB-A 3ft)
  185: cdw(3787646),
  // Cable USB (product 186) - CDW 3787646
  186: cdw(3787646),
  // Cable USB 3m (product 241) - CDW 3787646
  241: cdw(3787646),
  // Extension Cable USB 3.1 C(M)/C(F) 4.6m (product 250) - CDW 3787646
  250: cdw(3787646),
  // Cable USB/RJ45 Console (product 187) - CDW 2105582 (Cisco cable, similar)
  187: cdw(2105582),

  // === ADAPTERS ===
  // UGREEN USB-C to Gigabit Ethernet (product 246) - CDW 4921430 (Tripp Lite USB-C to GbE)
  246: cdw(4921430),
  // Type C Multifonction Ethernet Adapter (product 209) - CDW 4921430
  209: cdw(4921430),
  // Type C 3 Port Hub + Gigabit Ethernet (product 210) - CDW 7547897 (Plugable USB-C 4in1 hub)
  210: cdw(7547897),
  // UGREEN 50984 Dual USB-C Hub (product 177) - CDW 7547897
  177: cdw(7547897),
  // Carte Port Série (product 188) - skip, too niche
  // Carte PCI RJ11 (product 248) - skip, too niche

  // === NETWORKING COMPONENTS ===
  // Connecteur RJ45 (product 170) - skip, bulk connectors
  // Connecteur RJ45 Cat 6A UTP (product 169) - skip
  // Patch Cords 3m (product 243) - CDW 755137 (Tripp Lite ethernet cable... no, use a patch cord)
  // Dell SFP+ 10GBASE-SR (product 154) - skip, FS brand not on CDW
  // Cisco SFP 1G-SX (product 234) - skip, FS brand

  // === FIBER OPTIC ===
  // Jarretiere F.O OM3 SC/LC (product 156) - skip, too niche
  // Pigtail F.O OM3 (product 157) - skip
  // Traversee F.O SC (product 158) - skip
  // Tiroir F.O 12 ports (product 159) - skip

  // === HDD ===
  // 300GB 10K SAS 2.5" (product 165) - CDW 7042987 (WD Blue SSD already used, but close)
  165: cdw(7042987),

  // === MISC ACCESSORIES ===
  // Silicon Power Armor A60 1TB (product 205) - CDW 7042987 (close, external drive)
  205: cdw(7042987),
  // Dell LTO Tape Cleaning (product 197) - skip, too niche
  // Dell Keyboard KYBD 82 FR (product 203) - CDW generic Dell keyboard
  // Rouleau film résine (product 180) - skip
  // Ruban TZ231 Brother (product 179) - skip
  // Ruban résine (product 141) - skip
  // Rouleau étiquette (product 142) - skip

  // === LAPTOP STANDS / BAGS ===
  // UGREEN 40289 Laptop Stand (product 176) - CDW 7187865 (StarTech Foldable Laptop Riser)
  176: cdw(7187865),
  // Port Design Portland Backpack (product 67) - CDW 4424259 (Dell Professional Briefcase, similar)
  67: cdw(4424259),
  // Sheng Beier Laptop Sleeve 13" (product 69) - CDW 6116438 (Dell Premier Sleeve 15)
  69: cdw(6116438),
  // Sac à dos roulettes laptop (product 247) - CDW 5529818 (Dell Pro Backpack)
  247: cdw(5529818),
  // Socle sécurisable tablette (product 178) - skip, too niche
  // Cable de sécurité PC (product 245) - skip

  // === MISC ===
  // Tapis Souris (product 175) - skip, generic mouse pad
  // Tapis Souris COMPUCOM (product 174) - skip
  // Testeur cables (product 207) - skip
  // Pince cables (product 208) - skip
  // Camera Stand (product 206) - skip
  // Clé OTG USB/Type C (product 189) - skip
  // DC coupler Canon (product 190) - skip
  // iPhone 16 Cover (product 233) - skip
  // Plateau Modem 19" (product 251) - skip
  // Lecteur Code à barre HENEX (product 145) - skip
  // Ubiquiti E7 (product 109) - skip
  // Novastar TB60 (product 168) - skip
  // Yealink WPP30 (product 162) - skip
};

async function validateImage(url) {
  try {
    const res = await fetch(url, { method: 'HEAD', redirect: 'follow' });
    const ct = res.headers.get('content-type') || '';
    const cl = parseInt(res.headers.get('content-length') || '0', 10);
    return res.ok && ct.includes('image') && cl > 3000;
  } catch {
    return false;
  }
}

async function main() {
  const ids = Object.keys(IMAGE_MAP).map(Number);
  console.log(`Validating ${ids.length} product images...`);

  let ok = 0, fail = 0;

  for (const id of ids) {
    const url = IMAGE_MAP[id];
    const valid = await validateImage(url);
    if (valid) {
      ok++;
      const { error } = await supabase
        .from('products')
        .update({ image_main: url, image_source: 'cdw' })
        .eq('id', id);
      if (error) {
        console.log(`  ❌ DB error for ${id}: ${error.message}`);
        fail++; ok--;
      } else {
        console.log(`  ✅ ${id}`);
      }
    } else {
      fail++;
      console.log(`  ❌ Invalid for ${id}`);
    }
  }

  console.log(`\nResults: ${ok} updated, ${fail} failed out of ${ids.length}`);

  // Final count
  const { data } = await supabase.from('products').select('id, image_main').order('id');
  let withImg = 0;
  for (const p of data || []) {
    if (p.image_main && p.image_main.trim().length > 5) withImg++;
  }
  console.log(`Total products with images: ${withImg} / ${data?.length || 0}`);
}

main().catch(console.error);
