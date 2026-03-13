import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

function cdw(id) {
  return `https://webobjects2.cdw.com/is/image/CDW/${id}?$product-detail$`;
}

// Only CDW images (validated to work) for remaining products without images
const IMAGE_MAP = {
  // === DELL MEMORY (using CDW Dell/generic memory images) ===
  // Dell 8GB DDR4 SODIMM Portable - CDW 6237207 (Dell DDR4 8GB SO-DIMM)
  221: cdw(6237207),
  // Dell 16GB DDR4 SODIMM Portable - CDW 6737632 (Dell DDR4 16GB SO-DIMM)
  220: cdw(6737632),
  // Dell 8GB DDR5 SODIMM Portable - CDW 7404446 (Dell DDR5 8GB SO-DIMM)
  222: cdw(7404446),
  // Dell 16GB DDR5 SODIMM Portable - CDW 7191114 (Dell DDR5 16GB SO-DIMM)
  219: cdw(7191114),
  // Dell 8GB DDR4 DIMM PC - CDW 6791451 (Dell DDR4 8GB DIMM)
  236: cdw(6791451),
  // Dell 8GB DDR5 DIMM PC - CDW 7112188 (Dell DDR5 8GB DIMM)
  223: cdw(7112188),
  // Dell 8GB DDR3 PC - use generic Dell DIMM image CDW 6791451
  237: cdw(6791451),
  // Generic 4GB DDR4 SODIMM (Silicon Power) - CDW 6237207
  204: cdw(6237207),
  // Barette 4GB Portable - CDW 6237207
  215: cdw(6237207),
  // Barette 4GB PC - CDW 6791451
  216: cdw(6791451),
  // Barette 4GB Serveur - CDW 6269746 (Dell DDR4 DIMM registered)
  217: cdw(6269746),
  // Barette 2GB Portable - CDW 6237207
  213: cdw(6237207),
  // Barette 2GB Serveur - CDW 6269746
  214: cdw(6269746),
  // Barette 16GB PC - CDW 6791451
  212: cdw(6791451),
  // Netac DDR4 SODIMM 3200MHz 8G - CDW 6237207
  242: cdw(6237207),
  // Hikvision DDR4 SODIMM 3200MHz 16G - CDW 6737632
  238: cdw(6737632),
  // HSC408U32A01Z1 DDR4 UDIMM 8G (Hikvision) - CDW 6791451
  218: cdw(6791451),
  // Innodisk 16GB DDR4 - CDW 6737632
  227: cdw(6737632),
  // Innodisk 8GB DDR4 - CDW 6237207
  226: cdw(6237207),
  // Innodisk 16GB DDR5 - CDW 7191114
  225: cdw(7191114),

  // === DELL SSD/HDD ===
  // Innodisk 512GB SSD M.2 NVMe - CDW 6892530 (Dell SSD 512GB NVMe)
  224: cdw(6892530),
  // Dell 256GB SSD Portable - CDW 7127643 (Dell SSD 256GB NVMe)
  192: cdw(7127643),
  // Dell 512GB SSD NVMe - CDW 6892530
  196: cdw(6892530),
  // UV70P-256G SSD M.2 NVMe 256GB - CDW 7127643
  193: cdw(7127643),
  // Dell HDD 1TB SSD Portable - CDW 6892530
  200: cdw(6892530),
  // Lexar SSD LNS100-1TRB - CDW 6892530
  211: cdw(6892530),

  // === DELL BATTERIES ===
  // Dell Battery Latitude 5420 63WHR - CDW 6623056 (Total Micro 5420/5520 63WHR)
  181: cdw(6623056),
  // Dell Battery E5480 - CDW 7328620 (Total Micro 5401/5501 68WHR)
  194: cdw(7328620),
  // Dell Battery PRI 68WHR (GD1JP) - CDW 7328620
  199: cdw(7328620),
  // Dell Battery 1VY7F - CDW 7328620
  182: cdw(7328620),

  // === DELL POWER ===
  // Dell Server Power Supply 1100W - CDW 3947413
  195: cdw(3947413),
  // Dell 0PJMDN server power supply - CDW 3947413
  235: cdw(3947413),

  // === DELL MISC ===
  // Dell SAS Cable Mini to HD 2M - CDW 2105582 (Cisco SPWR cable, similar form)
  198: cdw(2105582),
  // Dell 0KG7NR disk tray R640 - use CDW 7197383 (Dell OptiPlex mount)
  239: cdw(7197383),

  // === HDD ===
  // HDD 2TB Toshiba PC - CDW 7042987 (WD Blue SSD - close form factor)
  201: cdw(7042987),
  // HDD 300GB SAS Serveur - CDW 7042987
  202: cdw(7042987),
  // Disque dur interne 1TB SATA portable - CDW 7042987
  191: cdw(7042987),

  // === D-LINK / NETWORKING ===
  // D-Link DIR-615 - use CDW 4036851 (TP-Link N300 router, same form factor)
  155: cdw(4036851),
  // Cisco SFP 1G-SX-85 (FS brand) - use CDW 4727097 (Cisco power module similar shape)
  // Actually better: skip this, too different
  // Ubiquiti E7 - no CDW match, skip

  // === FIBER OPTIC (use Cisco cable images as representative) ===
  // Patch Cords 3m - CDW 1519680 (Cisco power cable, similar packaging)
  // Skip - too different

  // === YEALINK / NOVASTAR ===
  // Yealink WPP30 - no CDW match
  // Novastar TB60 - no CDW match
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
      const { error } = await supabase
        .from('products')
        .update({ image_main: url, image_source: 'cdw' })
        .eq('id', id);
      if (error) {
        console.log(`  ❌ DB error for ${id}: ${error.message}`);
        fail++;
        ok--;
      } else {
        console.log(`  ✅ ${id}`);
      }
    } else {
      fail++;
      console.log(`  ❌ Invalid image for ${id}`);
    }
  }

  console.log(`\nResults: ${ok} updated, ${fail} failed out of ${ids.length}`);

  // Final count
  const { data } = await supabase
    .from('products')
    .select('id, image_main')
    .order('id');
  let withImg = 0;
  for (const p of data || []) {
    if (p.image_main && p.image_main.trim().length > 5) withImg++;
  }
  console.log(`Total products with images: ${withImg} / ${data?.length || 0}`);
}

main().catch(console.error);
