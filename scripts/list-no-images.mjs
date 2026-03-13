import { createClient } from '@supabase/supabase-js';
const s = createClient('https://ckuktpfipbxjwxztizgv.supabase.co','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8');
async function run() {
  const { data, error } = await s.from('products').select('id,sku,brand,category,subcategory,title_raw,title_commercial,image_main').order('category').order('brand');
  if (error) { console.log('Error:', error.message); return; }
  console.log('Fetched rows:', data.length);
  let withImg = 0, without = 0;
  let lastCat = '';
  for (const p of data) {
    if (p.image_main && p.image_main.trim().length > 5) { withImg++; continue; }
    without++;
    if (p.category !== lastCat) { lastCat = p.category; console.log('\n--- ' + p.category + ' ---'); }
    const title = p.title_commercial || p.title_raw || '';
    console.log(p.id + ' | ' + (p.brand || '') + ' | ' + (p.sku || '') + ' | ' + title.substring(0,80));
  }
  console.log('\nTotal: ' + data.length + ' | With images: ' + withImg + ' | Without: ' + without);
}
run();
