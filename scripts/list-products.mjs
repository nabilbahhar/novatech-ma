import { createClient } from '@supabase/supabase-js';
const supabase = createClient('https://ckuktpfipbxjwxztizgv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8');

const { data, error } = await supabase.from('products').select('sku,brand,title_commercial,category,subcategory').order('brand');
if (error) { console.error(error); process.exit(1); }

const brands = {};
data.forEach(p => {
  if (!brands[p.brand]) brands[p.brand] = [];
  brands[p.brand].push(`${p.sku} | ${p.title_commercial} | ${p.subcategory}`);
});

for (const [brand, items] of Object.entries(brands)) {
  console.log(`\n=== ${brand} (${items.length}) ===`);
  items.forEach(i => console.log(i));
}
