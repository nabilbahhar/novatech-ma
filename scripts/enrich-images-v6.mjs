import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

function cdw(id) {
  return `https://webobjects2.cdw.com/is/image/CDW/${id}?$product-detail$`;
}

const IMAGE_MAP = {
  // Dell Smart Dock SD25 - exact match
  34: { url: cdw('8362105'), source: 'cdw' },
  // Dell Active Pen PN557W - using PN556W (predecessor, same design)
  164: { url: cdw('4090076'), source: 'cdw' },
  // Honeywell MK5145 Eclipse - exact match
  147: { url: cdw('809403'), source: 'cdw' },
  // Lenovo T210 Casual Toploader - exact match
  70: { url: cdw('7479956'), source: 'cdw' },
  // Jabra BIZ 2300 QD Duo - exact match for 2309-820-104
  88: { url: cdw('3259192'), source: 'cdw' },
  // Jabra Link 230 - small adapter
  100: { url: cdw('3259192'), source: 'cdw' },
  // Jabra Link 265
  101: { url: cdw('3259192'), source: 'cdw' },
  // Jabra GN1200 Cable
  102: { url: cdw('3259192'), source: 'cdw' },
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
  // Only update exact matches (first 4)
  const exactMatches = [34, 164, 147, 70];
  console.log(`Testing and updating ${exactMatches.length} exact-match products...\n`);

  let updated = 0;
  for (const id of exactMatches) {
    const { url, source } = IMAGE_MAP[id];
    const valid = await testImageUrl(url);
    if (valid) {
      const { error } = await supabase
        .from('products')
        .update({ image_main: url, image_source: source })
        .eq('id', id);
      if (!error) { console.log(`  ✓ ${id}`); updated++; }
      else console.log(`  ERROR ${id}: ${error.message}`);
    } else {
      console.log(`  ✗ ${id} invalid`);
    }
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\nUpdated: ${updated}`);
  const { data } = await supabase.from('products').select('id').not('image_main', 'is', null);
  console.log(`Products with images: ${data?.length || 0} / 251`);
}

main().catch(console.error);
