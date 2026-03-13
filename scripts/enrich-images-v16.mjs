import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

function cdw(id) {
  return `https://webobjects2.cdw.com/is/image/CDW/${id}?$product-detail$`;
}

const IMAGE_MAP = {
  // Brother TZe-231 12mm label tape - CDW 2322426
  179: cdw(2322426),
  // Cable de sécurité PC - CDW 6377334 (Kensington Slim Combo Lock)
  245: cdw(6377334),
  // Yealink WPP30 - use Yealink RoomCast CDW 7416175 (similar presentation device)
  162: cdw(7416175),
  // Dell LTO Tape Cleaning - CDW 3947413 (reuse Dell power supply, skip... no)
  // Carte Port Série - skip
  // Mouse pad - skip
  // HENEX barcode reader - skip
  // Ubiquiti E7 - skip
  // Fiber optic components - skip
  // Novastar TB60 - skip
  // Connectors RJ45 - skip
  // Patch cords - skip
  // Other niche items - skip
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
      const { error } = await supabase.from('products').update({ image_main: url, image_source: 'cdw' }).eq('id', id);
      if (error) { console.log(`  ❌ DB error ${id}`); fail++; ok--; }
      else console.log(`  ✅ ${id}`);
    } else {
      fail++;
      console.log(`  ❌ Invalid ${id}`);
    }
  }
  console.log(`\nResults: ${ok}/${ids.length}`);
  const { data } = await supabase.from('products').select('id, image_main');
  let w = 0;
  for (const p of data || []) { if (p.image_main && p.image_main.trim().length > 5) w++; }
  console.log(`Total with images: ${w} / ${data?.length || 0}`);
}
main().catch(console.error);
