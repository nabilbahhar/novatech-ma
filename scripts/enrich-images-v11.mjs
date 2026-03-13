import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

function cdw(id) {
  return `https://webobjects2.cdw.com/is/image/CDW/${id}?$product-detail$`;
}

const IMAGE_MAP = {
  // === PHILIPS DISPLAYS ===
  // Philips 10BDL5051T/00 Signage Solutions 10" Multi-Touch
  33: { url: cdw('8127097'), source: 'cdw' },
  // Philips 110HDL7012IA/00 Unite LED 7000 110" Bezel Free Videowall
  32: { url: cdw('8051191'), source: 'cdw' },

  // === PALO ALTO ===
  // PAN-PA-400-RACKTRAY Rack mountable tray for PA-400s
  160: { url: cdw('6576856'), source: 'cdw' },

  // === JABRA ACCESSORIES ===
  // Jabra Engage Link USB-A 50-119 (using 50-219 UC variant - same form factor)
  105: { url: cdw('5466668'), source: 'cdw' },
  // Jabra Coussinets simili cuir EVOLVE 20-65 14101-46
  // Skip - too specific, no exact CDW match

  // === CISCO ===
  // Cisco CAB-CEE77-C19-EU power cable
  // No exact match on CDW

  // === ZEBRA SCANNERS ===
  // Already in DB from v4

  // === DELL ===
  // Dell Display/VGA adapter (DisplayPort to VGA) - no Dell-specific DP-VGA on CDW
  // Product 80 - skip
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
