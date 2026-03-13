import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

async function testImageUrl(url) {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    // Use GET instead of HEAD - some CDNs block HEAD requests
    const res = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'image/*,*/*'
      }
    });
    clearTimeout(timeout);

    if (!res.ok) return { valid: false, status: res.status };

    const ct = res.headers.get('content-type') || '';
    const isImage = ct.includes('image') || ct.includes('octet-stream');
    const cl = parseInt(res.headers.get('content-length') || '0');

    // Dell CDN returns a tiny 1x1 placeholder for invalid paths
    // Real images are > 5KB
    if (cl > 0 && cl < 2000) return { valid: false, status: 'too_small' };

    return { valid: isImage || cl > 5000, status: res.status, contentType: ct, size: cl };
  } catch (e) {
    return { valid: false, status: e.message };
  }
}

async function main() {
  console.log('Fetching products with images...');
  const { data: products, error } = await supabase
    .from('products')
    .select('id,sku,brand,title_commercial,image_main,image_source')
    .not('image_main', 'is', null);

  if (error) { console.error(error); process.exit(1); }
  console.log(`Found ${products.length} products with image URLs\n`);

  let valid = 0;
  let broken = 0;
  const toFix = [];

  for (const p of products) {
    process.stdout.write(`Testing ${p.brand} ${p.title_commercial.slice(0,40)}... `);
    const result = await testImageUrl(p.image_main);

    if (result.valid) {
      console.log(`OK (${result.size ? Math.round(result.size/1024) + 'KB' : result.status})`);
      valid++;
    } else {
      console.log(`BROKEN (${result.status})`);
      broken++;
      toFix.push(p.id);
    }

    // Rate limit
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n========================================`);
  console.log(`Valid:  ${valid}`);
  console.log(`Broken: ${broken}`);
  console.log(`========================================\n`);

  if (toFix.length > 0) {
    console.log(`Removing ${toFix.length} broken image URLs...`);

    for (const id of toFix) {
      const { error: upErr } = await supabase
        .from('products')
        .update({ image_main: null, image_source: null })
        .eq('id', id);

      if (upErr) console.error(`  Error fixing ${id}:`, upErr.message);
    }

    console.log('Done! Broken URLs removed.');
  }

  // Show final stats
  const { data: remaining } = await supabase
    .from('products')
    .select('brand,image_main')
    .not('image_main', 'is', null);

  console.log(`\nProducts with valid images: ${remaining?.length || 0}`);
}

main().catch(console.error);
