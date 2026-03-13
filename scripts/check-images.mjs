import { createClient } from '@supabase/supabase-js';
const s = createClient('https://ckuktpfipbxjwxztizgv.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8');

// Check computers with images
const { data, error } = await s.from('products').select('title_commercial,image_main,category').not('image_main', 'is', null).limit(10);
if (error) { console.error(error); process.exit(1); }

console.log('=== Products WITH images ===');
data.forEach(p => console.log(`${p.category} | ${p.title_commercial.slice(0,60)} | ${p.image_main.slice(0,80)}...`));

// Count by category
const { data: stats } = await s.from('products').select('category,image_main');
const byCat = {};
stats.forEach(p => {
  if (!byCat[p.category]) byCat[p.category] = { total: 0, withImage: 0 };
  byCat[p.category].total++;
  if (p.image_main) byCat[p.category].withImage++;
});
console.log('\n=== Image coverage by category ===');
for (const [cat, s] of Object.entries(byCat)) {
  console.log(`${cat}: ${s.withImage}/${s.total} (${Math.round(s.withImage/s.total*100)}%)`);
}
