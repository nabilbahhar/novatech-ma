import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

function cdw(id) {
  return `https://webobjects2.cdw.com/is/image/CDW/${id}?$product-detail$`;
}

// All verified CDW product mappings
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

  // === XEROX VERSALINK C7020/C7025/C7030 TONERS ===
  // 106R03745 Black Extra Hi Cap (DMO) - using US equiv 106R03737
  130: { url: cdw('4636464'), source: 'cdw' },
  // 106R03748 Cyan Extra Hi Cap (DMO) - using US equiv 106R03740
  131: { url: cdw('4636467'), source: 'cdw' },
  // 106R03746 Yellow Extra Hi Cap (DMO) - using US equiv 106R03738
  132: { url: cdw('4636465'), source: 'cdw' },
  // 106R03747 Magenta Extra Hi Cap (DMO) - using US equiv 106R03739
  133: { url: cdw('4636466'), source: 'cdw' },
  // 115R00128 Waste Cartridge C7020/C7025/C7030
  134: { url: cdw('4636489'), source: 'cdw' },
  // 113R00780 Drum C7020/C7025/C7030
  135: { url: cdw('4636483'), source: 'cdw' },

  // === XEROX ALTALINK C8245/C8255/C8270 TONERS ===
  // C8245_55_70B Black - 006R01746
  136: { url: cdw('6151589'), source: 'cdw' },
  // C8245_55_70Y Yellow - 006R01749
  137: { url: cdw('6151592'), source: 'cdw' },
  // C8245_55_70C Cyan - 006R01747
  138: { url: cdw('6151590'), source: 'cdw' },
  // C8245_55_70M Magenta - 006R01748
  139: { url: cdw('6151591'), source: 'cdw' },
  // 008R08101 Waste toner AltaLink C8235
  143: { url: cdw('6151594'), source: 'cdw' },
  // BAC A DÉCHET for Xerox C7025 (same as 115R00128)
  244: { url: cdw('4636489'), source: 'cdw' },

  // === TOSHIBA T-FC415E TONERS (e-Studio 3015AC) ===
  // T-FC415E-K Black - using US equiv TFC415UK
  123: { url: cdw('7111384'), source: 'cdw' },
  // T-FC415E-C Cyan - using US equiv TFC415UC
  122: { url: cdw('7622580'), source: 'cdw' },
  // T-FC415E-M Magenta - using US equiv TFC415UM
  124: { url: cdw('5604539'), source: 'cdw' },
  // T-FC415E-Y Yellow - using US equiv TFC415UY
  125: { url: cdw('6412250'), source: 'cdw' },

  // === DELL BAGS & ACCESSORIES ===
  // Dell Gaming Backpack 17 GM1720PM
  62: { url: cdw('8305212'), source: 'cdw' },
  // Targus 100W USB-C PowerBank APB080GL
  73: { url: cdw('7914791'), source: 'cdw' },

  // === KENSINGTON PRIVACY FILTER ===
  // Kensington Privacy Screen Filter 15.6" 16:9
  231: { url: cdw('6080800'), source: 'cdw' },
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

  // Process in batches of 5
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
        if (!error) {
          console.log(`  ✓ ${id} updated`);
          updated++;
        } else {
          console.log(`  ERROR ${id}: ${error.message}`);
          failed++;
        }
      } else {
        console.log(`  ✗ ${id} invalid image`);
        failed++;
      }
    }
  }

  console.log(`\nResults: ${updated} updated, ${failed} failed`);
  const { data } = await supabase.from('products').select('id').not('image_main', 'is', null);
  console.log(`Total products with images: ${data?.length || 0}`);
}

main().catch(console.error);
