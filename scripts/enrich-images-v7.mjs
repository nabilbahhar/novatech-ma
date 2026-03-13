import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

function cdw(id) {
  return `https://webobjects2.cdw.com/is/image/CDW/${id}?$product-detail$`;
}

const IMAGE_MAP = {
  // === LEXMARK TONERS ===
  // Lexmark 76C00K0 Black - CS921DN
  115: { url: cdw('5067486'), source: 'cdw' },
  // Lexmark 76C00C0 Cyan - CS921DN
  114: { url: cdw('5067490'), source: 'cdw' },
  // Lexmark 76C00M0 Magenta - CS921DN
  116: { url: cdw('5067492'), source: 'cdw' },
  // Lexmark 76C00Y0 Yellow - CS921DN
  117: { url: cdw('5067497'), source: 'cdw' },
  // Lexmark 85D0HK0 Black - CX930
  119: { url: cdw('7447739'), source: 'cdw' },
  // Lexmark 85D0HM0 Magenta - CX930
  120: { url: cdw('7447748'), source: 'cdw' },
  // Lexmark 85D0HY0 Yellow - CX930
  121: { url: cdw('7447750'), source: 'cdw' },

  // === XEROX VERSALINK C7020/C7025/C7030 ===
  // 106R03745 Black Extra Hi Cap (use 106R03737 high cap image - same look)
  130: { url: cdw('4636464'), source: 'cdw' },
  // 106R03748 Cyan Extra Hi Cap (use 106R03740 high cap image - same look)
  131: { url: cdw('4636467'), source: 'cdw' },
  // 106R03746 Yellow Extra Hi Cap (use 106R03738 extra high cap image)
  132: { url: cdw('4636465'), source: 'cdw' },
  // 106R03747 Magenta Extra Hi Cap (use 106R03739 extra high cap image)
  133: { url: cdw('4636466'), source: 'cdw' },
  // 115R00128 Waste Cartridge
  134: { url: cdw('4636489'), source: 'cdw' },
  // 113R00780 Drum
  135: { url: cdw('4636483'), source: 'cdw' },

  // === XEROX ALTALINK C8245 ===
  // 006R01828 Black Toner (use C8130/C8200 series black 006R01746 - same cartridge design)
  140: { url: cdw('6151589'), source: 'cdw' },
  // C8245_55_70C Cyan (use C8100/C8200 cyan 006R01747)
  138: { url: cdw('6151590'), source: 'cdw' },
  // 008R08101 Bac a dechet Xerox AltaLink (use C8030 series waste)
  // 244: BAC A DECHET - use same waste image as VersaLink
  244: { url: cdw('4636489'), source: 'cdw' },

  // === TOSHIBA T-FC415E (use US T-FC415U equivalent images) ===
  // TFC415EK Black
  123: { url: cdw('7111384'), source: 'cdw' },
  // TFC415EC Cyan
  122: { url: cdw('7622580'), source: 'cdw' },
  // TFC415EM Magenta
  124: { url: cdw('5604539'), source: 'cdw' },
  // TFC415EY Yellow
  125: { url: cdw('6412250'), source: 'cdw' },
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
