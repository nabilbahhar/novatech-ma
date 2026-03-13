import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

// Remove images that don't match the actual product
// These were set to placeholder/wrong product images in v3
const TO_REMOVE = [
  // Jabra accessories using headset images (wrong product type)
  100, // Jabra Link 230 - small adapter, not a headset
  101, // Jabra Link 265 - cable adapter, not a headset
  102, // Jabra GN1200 Cable - cable, not a headset
  103, // Jabra Remote Control - remote, not a headset
  104, // Jabra Ear Cushions - pads, not a headset
  105, // Jabra Engage Link - USB adapter, not a headset
  87,  // PanaCast 50 Screen Mount - mount bracket, not a headset
  107, // Poly HIS Cable - cable, not a headset

  // Dell adapters using wrong adapter image
  80,  // DisplayPort to VGA - using USB-C to HDMI/DP adapter (different)
  81,  // HDMI to VGA - using USB-C to HDMI/DP adapter (different)

  // Wrong product matches
  34,  // Pro Smart Dock SD25 - using WL5024 headset image (wrong product)
  164, // PN557W Active Pen - using KB813 keyboard image (wrong product)

  // Monitor using wrong model image
  29,  // MDA20 Dual Monitor Arm - using E2425HSM monitor image (wrong product)

  // Dell bags - some using wrong model images
  51,  // Carry Case Rugged - using CC5623 (different product)
  55,  // PE1520C Premier Briefcase - using CC5623 (different design)
  62,  // GM1720PM Gaming Backpack - using CP5723 (different design)
  52,  // CC5425C - using CC5623 (different model)

  // Power accessories using wrong adapter
  75,  // Dell Power Bank PW7015L - using 65W adapter (different form factor)

  // Lenovo using Dell Latitude image
  15,  // ThinkBook 15 - using Dell Latitude image (wrong brand!)

  // Xerox toners using C7000 generic image that may not match
  130, 131, 132, 133, // VersaLink C7020 toners - CDW images are for C7000 series which is different

  // Evolve 65 TE using Evolve 20 image (different headset model)
  97,  // Evolve 65 TE - using Evolve 20 (visually different)
];

async function main() {
  console.log(`Removing ${TO_REMOVE.length} mismatched images...\n`);

  for (const id of TO_REMOVE) {
    const { error } = await supabase
      .from('products')
      .update({ image_main: null, image_source: null })
      .eq('id', id);

    if (error) {
      console.log(`  ERROR ${id}: ${error.message}`);
    } else {
      console.log(`  ✓ ${id} cleared`);
    }
  }

  const { data: withImages } = await supabase
    .from('products')
    .select('id')
    .not('image_main', 'is', null);

  console.log(`\nProducts with images: ${withImages?.length || 0} / 251`);
}

main().catch(console.error);
