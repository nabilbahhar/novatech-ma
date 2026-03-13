import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

function cdw(id) {
  return `https://webobjects2.cdw.com/is/image/CDW/${id}?$product-detail$`;
}

// ONLY exact or near-identical product matches
const IMAGE_MAP = {
  97: { url: cdw('8096064'), source: 'cdw' },      // Jabra Evolve 65 TE Stereo - exact model
  15: { url: cdw('7133124'), source: 'cdw' },      // Lenovo ThinkBook 15 G4 IAP i7-1255U - exact
  29: { url: cdw('7364422'), source: 'cdw' },      // Dell MDA20 Dual Monitor Arm - exact
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
  for (const id of ids) {
    const { url, source } = IMAGE_MAP[id];
    const valid = await testImageUrl(url);
    if (valid) {
      const { error } = await supabase
        .from('products')
        .update({ image_main: url, image_source: source })
        .eq('id', id);
      if (!error) {
        console.log(`  ✓ ${id}`);
        updated++;
      }
    } else {
      console.log(`  ✗ ${id} invalid`);
    }
  }

  console.log(`\nUpdated: ${updated}`);
  const { data } = await supabase.from('products').select('id').not('image_main', 'is', null);
  console.log(`Products with images: ${data?.length || 0} / 251`);
}

main().catch(console.error);
