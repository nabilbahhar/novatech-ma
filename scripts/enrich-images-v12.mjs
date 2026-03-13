import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

function cdw(id) {
  return `https://webobjects2.cdw.com/is/image/CDW/${id}?$product-detail$`;
}

const IMAGE_MAP = {
  // Cisco GLC-SX-MMD SFP transceiver (already added in v4, but product 234 is FS brand SFP1G-SX-85)
  // FS SFP not on CDW, skip 234

  // === Cisco CAB-CEE77-C19-EU power cable ===
  // CDW has generic IEC cables, not exact match - skip 150

  // === Dell Pro 14-16 Plus EcoLoop Backpack CP5626 ===
  // Product reference is "DELLCC5626" but CDW has CP5626 backpack
  // Skip - CC5626 vs CP5626 are different models (CC = briefcase, CP = backpack)

  // === Novastar TB60 Controller ===
  // Product 168 CRD20094/00 - Novastar not on CDW - skip

  // === Yealink WPP30 ===
  // Product 162 - not on CDW - skip

  // === Philips 58BFL2114/12 ===
  // Not found on CDW - skip

  // === Port Design Portland Backpack 15" ===
  // Product 67 - 105330 - skip, not on CDW

  // The remaining products without images are mostly:
  // - Generic cables (HDMI, USB, Type-C, console cables)
  // - Generic RAM modules (Netac, Hikvision, Innodisk, Silicon Power)
  // - Generic accessories (tapis souris, pince cables, testeur)
  // - Fiber optic components (jarretiere, pigtail, traversee, tiroir)
  // - Dell internal components (batteries, HDD, SSD, memory, SAS cables)
  // - iPhone cover, rouleau etiquette, ruban resine
  // These are niche/generic products not available on CDW

  // Let's add what we CAN still match:

  // Honeywell MK5145 already in DB (added in v6 as product 147, CDW 809403)
  // Zebra DS2278 already in DB (added in v4 as product ? )
  // Let's verify and add any missing ones

  // === Dell EcoLoop Pro CC5623 Briefcase (closest match to CC5425C) ===
  // Product 52 DELLCC5425C - using CC5623 image (same product line, similar look)
  // Actually no - different model, could look different. Skip for accuracy.

  // No new exact matches found. The remaining ~107 products are:
  // - Generic/niche brands not on CDW
  // - Internal Dell components (RAM, batteries, SSDs, HDD) without specific Dell part# on CDW
  // - Fiber optic components
  // - Generic accessories
};

async function main() {
  const ids = Object.keys(IMAGE_MAP).map(Number);
  if (ids.length === 0) {
    console.log('No new products to update.');
    const { data } = await supabase.from('products').select('id').not('image_main', 'is', null);
    console.log(`Total products with images: ${data?.length || 0} / 251`);

    // List remaining products without images
    const { data: noImg } = await supabase
      .from('products')
      .select('id, reference, designation, category, brand')
      .is('image_main', null)
      .order('category')
      .order('brand');

    console.log(`\nProducts still without images: ${noImg?.length || 0}`);
    if (noImg) {
      let lastCat = '';
      for (const p of noImg) {
        if (p.category !== lastCat) {
          lastCat = p.category;
          console.log(`\n--- ${p.category} ---`);
        }
        console.log(`  ${p.id} | ${p.reference} | ${p.designation?.substring(0, 60)}`);
      }
    }
  }
}

main().catch(console.error);
