import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

function cdw(id) {
  return `https://webobjects2.cdw.com/is/image/CDW/${id}?$product-detail$`;
}

const IMAGE_MAP = {
  // === DELL BAGS & CASES ===
  // Dell Gaming Backpack 17 GM1720PM
  62: { url: cdw('8305212'), source: 'cdw' },

  // === DELL ADAPTERS ===
  // Dell HDMI to VGA adapter DAUBNBC084
  81: { url: cdw('4254047'), source: 'cdw' },
  // Dell Display/VGA adapter (use same Dell HDMI/VGA image)
  80: { url: cdw('4254047'), source: 'cdw' },

  // === DELL MOUNT ===
  // Dell OptiPlex Micro & Thin Client Pro 2 Mount Kit
  30: { url: cdw('7197381'), source: 'cdw' },

  // === DELL POWER ===
  // Dell Laptop Power Bank Plus 65Wh PW7015L (use successor PW7018LC image - same design)
  75: { url: cdw('4982138'), source: 'cdw' },
  // Targus 100W USB-C PowerBank APB080GL (use Dell branded Targus 100W image)
  73: { url: cdw('7914791'), source: 'cdw' },

  // === CISCO ===
  // Cisco CAB-SPWR 150CM Stack Power Cable
  151: { url: cdw('2086489'), source: 'cdw' },

  // === PRIVACY FILTERS ===
  // Kensington Privacy Screen Filter 15.6" (K52125WW FP156W9)
  231: { url: cdw('6080800'), source: 'cdw' },
  // Filtre 15.6 pouces (use same Kensington 15.6" image)
  230: { url: cdw('6080800'), source: 'cdw' },
  // Filtre 14 pouces (use Kensington 14" FP140W9 - CDW# 5892640)
  229: { url: cdw('5892640'), source: 'cdw' },
  // Filtre 13 pouces (use Kensington 13.3" FP133W9 - CDW# 4697481)
  228: { url: cdw('4697481'), source: 'cdw' },
  // Filtre de confidentialité generic (use Kensington 15.6")
  232: { url: cdw('6080800'), source: 'cdw' },

  // === XEROX ALTALINK C8245 remaining ===
  // C8245_55_70B Black (use C8130/35/45/55/70 black 006R01746)
  136: { url: cdw('6151589'), source: 'cdw' },
  // C8245_55_70Y Yellow (use C8100/C8200 yellow 006R01749)
  137: { url: cdw('6151592'), source: 'cdw' },
  // C8245_55_70M Magenta (use C8100/C8200 magenta 006R01748)
  139: { url: cdw('6151591'), source: 'cdw' },
  // 008R08101 Bac a dechet Xerox AltaLink C8235
  143: { url: cdw('4636489'), source: 'cdw' },
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
  for (const id of ids) {
    const { url, source } = IMAGE_MAP[id];
    const valid = await testImageUrl(url);
    if (valid) {
      const { error } = await supabase
        .from('products')
        .update({ image_main: url, image_source: source })
        .eq('id', id);
      if (!error) { console.log(`  ✓ ${id} updated`); updated++; }
      else { console.log(`  ERROR ${id}: ${error.message}`); failed++; }
    } else {
      console.log(`  ✗ ${id} invalid image`);
      failed++;
    }
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\nResults: ${updated} updated, ${failed} failed`);
  const { data } = await supabase.from('products').select('id').not('image_main', 'is', null);
  console.log(`Total products with images: ${data?.length || 0}`);
}

main().catch(console.error);
