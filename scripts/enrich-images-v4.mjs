import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

function cdw(id) {
  return `https://webobjects2.cdw.com/is/image/CDW/${id}?$product-detail$`;
}

// ONLY exact product matches or same-product-different-region (e.g., 415X = 414X)
const IMAGE_MAP = {
  // Exact CDW matches for specific products
  49: { url: cdw('7215817'), source: 'cdw' },      // Dell MS700 Bluetooth Mouse - exact match
  85: { url: cdw('5852990'), source: 'cdw' },      // Dell USB-C to HDMI/DP adapter - exact match
  76: { url: cdw('4535002'), source: 'cdw' },      // Kensington N17 Keyed Lock for Dell - exact
  77: { url: cdw('5665578'), source: 'cdw' },      // Kensington N17 Combination Lock - exact
  74: { url: cdw('8546827'), source: 'cdw' },      // Targus 140W USB-C PowerBank APB081GL - exact
  110: { url: cdw('6069272'), source: 'cdw' },     // Epson PowerLite 992F (= EB-992F) - exact
  163: { url: cdw('6772783'), source: 'cdw' },     // Logitech R500s (= R500 series) - exact model
  144: { url: cdw('4814541'), source: 'cdw' },     // Zebra DS2278-SR7U2100PRW - exact SKU match
  146: { url: cdw('2696083'), source: 'cdw' },     // Zebra LI4278 - exact model
  152: { url: cdw('2542675'), source: 'cdw' },     // Cisco GLC-SX-MM SFP - exact
  153: { url: cdw('1651560'), source: 'cdw' },     // Cisco SFP-10G-SR - exact
  111: { url: cdw('6402113'), source: 'cdw' },     // HP LaserJet M480f (4303fdn is same chassis) - close match

  // HP 415X = HP 414X (same cartridge, different region naming)
  126: { url: cdw('5590302'), source: 'cdw' },     // HP 415X Black = 414X Black
  127: { url: cdw('5590293'), source: 'cdw' },     // HP 415X Cyan = 414A Cyan
  128: { url: cdw('5590293'), source: 'cdw' },     // HP 415X Yellow (same box design as cyan)
  129: { url: cdw('5590308'), source: 'cdw' },     // HP 415X Magenta = 414X Magenta
};

async function testImageUrl(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    const res = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/*,*/*'
      }
    });
    clearTimeout(timeout);
    if (!res.ok) return false;
    const ct = res.headers.get('content-type') || '';
    const cl = parseInt(res.headers.get('content-length') || '0');
    if (cl > 0 && cl < 3000) return false;
    return ct.includes('image') || cl > 5000;
  } catch {
    return false;
  }
}

async function main() {
  const ids = Object.keys(IMAGE_MAP).map(Number);
  console.log(`Testing and updating ${ids.length} products...\n`);

  let updated = 0;
  let failed = 0;

  for (let i = 0; i < ids.length; i += 5) {
    const batch = ids.slice(i, i + 5);
    const results = await Promise.all(
      batch.map(async (id) => {
        const { url, source } = IMAGE_MAP[id];
        const valid = await testImageUrl(url);
        return { id, url, source, valid };
      })
    );

    for (const { id, url, source, valid } of results) {
      if (valid) {
        const { error } = await supabase
          .from('products')
          .update({ image_main: url, image_source: source })
          .eq('id', id);
        if (error) {
          console.log(`  ERROR ${id}: ${error.message}`);
          failed++;
        } else {
          console.log(`  ✓ ${id}`);
          updated++;
        }
      } else {
        console.log(`  ✗ ${id} invalid`);
        failed++;
      }
    }
    if (i + 5 < ids.length) await new Promise(r => setTimeout(r, 300));
  }

  console.log(`\nUpdated: ${updated} | Failed: ${failed}`);

  const { data: withImages } = await supabase
    .from('products')
    .select('id')
    .not('image_main', 'is', null);

  console.log(`Products with images: ${withImages?.length || 0} / 251`);
}

main().catch(console.error);
