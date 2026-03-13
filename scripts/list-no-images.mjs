import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

const { data, error } = await supabase
  .from('products')
  .select('id,sku,brand,title_commercial,category,subcategory')
  .is('image_main', null)
  .order('category')
  .order('brand');

if (error) { console.error(error); process.exit(1); }

console.log('Total without images:', data.length);

const grouped = {};
data.forEach(p => {
  const key = `${p.category} > ${p.brand}`;
  if (!grouped[key]) grouped[key] = [];
  grouped[key].push({ id: p.id, sku: p.sku, title: p.title_commercial, sub: p.subcategory });
});

for (const [key, items] of Object.entries(grouped)) {
  console.log(`\n${key} (${items.length}):`);
  items.forEach(i => console.log(`  ${i.id} | ${i.sku} | ${i.title}`));
}
