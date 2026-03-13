import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

function cdw(id) {
  return `https://webobjects2.cdw.com/is/image/CDW/${id}?$product-detail$`;
}

const IMAGE_MAP = {
  // === JABRA ACCESSORIES ===
  // Jabra PanaCast 50 Screen Mount 14207-72
  87: { url: cdw('6650702'), source: 'cdw' },
  // Jabra Remote Control 8220-209 for PanaCast 50
  103: { url: cdw('6583516'), source: 'cdw' },

  // === CISCO NETWORKING ===
  // Cisco C9400-PWR-3200AC power supply
  149: { url: cdw('4727097'), source: 'cdw' },
  // Cisco CAB-SPWR-150CM Stack Power Cable
  151: { url: cdw('2105582'), source: 'cdw' },
  // Cisco Catalyst 9407R-96U-BNDL-E chassis bundle
  148: { url: cdw('4729149'), source: 'cdw' },

  // === DELL ADAPTERS & MOUNTS ===
  // Dell HDMI to VGA adapter DAUBNBC084
  81: { url: cdw('4254047'), source: 'cdw' },
  // Dell OptiPlex Micro / Thin Client mount PRO 2
  30: { url: cdw('7197383'), source: 'cdw' },

  // === STORAGE ===
  // WD Blue SSD 1TB SATA SA510 WDS100T3B0A
  249: { url: cdw('7042987'), source: 'cdw' },
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
        if (!error) { console.log(`  ✓ ${id} updated`); updated++; }
        else { console.log(`  ERROR ${id}: ${error.message}`); failed++; }
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
