import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

function cdw(id) {
  return `https://webobjects2.cdw.com/is/image/CDW/${id}?$product-detail$`;
}

// Map: database product ID => { url, source }
const IMAGE_MAP = {
  // ===== DELL PERIPHERALS =====
  36: { url: cdw('4306011'), source: 'cdw' },      // KB216 AZERTY
  37: { url: cdw('4306011'), source: 'cdw' },      // KB216 QWERTY (same look)
  35: { url: cdw('4306011'), source: 'cdw' },      // KB212 (similar design)
  39: { url: cdw('4369184'), source: 'cdw' },      // KB522
  38: { url: cdw('4124887'), source: 'cdw' },      // KB813 Smartcard
  40: { url: cdw('6403806'), source: 'cdw' },      // KM5221W
  41: { url: cdw('5909103'), source: 'cdw' },      // KM7120W
  42: { url: cdw('6418104'), source: 'cdw' },      // KM7321W
  43: { url: cdw('7463661'), source: 'cdw' },      // KM900
  44: { url: cdw('3938481'), source: 'cdw' },      // MS116 Black
  45: { url: cdw('3938481'), source: 'cdw' },      // MS116 White (using black image)
  46: { url: cdw('5909094'), source: 'cdw' },      // MS3320W
  47: { url: cdw('5909098'), source: 'cdw' },      // MS5120W
  48: { url: cdw('6418099'), source: 'cdw' },      // MS7421W
  50: { url: cdw('4067532'), source: 'cdw' },      // WM126
  34: { url: cdw('7802747'), source: 'cdw' },      // Pro Smart Dock SD25 (using related)
  164: { url: cdw('4124887'), source: 'cdw' },     // PN557W Active Pen (using KB813 placeholder - will update)

  // ===== DELL MONITORS =====
  23: { url: cdw('8323507'), source: 'cdw' },      // E2225HM
  20: { url: cdw('8323510'), source: 'cdw' },      // E2725HM
  22: { url: cdw('6762543'), source: 'cdw' },      // E2222H
  24: { url: cdw('8323513'), source: 'cdw' },      // E2425HSM
  21: { url: cdw('7878803'), source: 'cdw' },      // P2725HE
  29: { url: cdw('8323513'), source: 'cdw' },      // MDA20 (placeholder - monitor arm)
  26: { url: cdw('8323507'), source: 'cdw' },      // S2421H (similar Dell monitor shape)
  27: { url: cdw('8323510'), source: 'cdw' },      // S2725DS (similar Dell monitor shape)
  28: { url: cdw('8323507'), source: 'cdw' },      // SE2425HM (similar Dell monitor shape)

  // ===== DELL ADAPTERS =====
  79: { url: cdw('6454202'), source: 'cdw' },      // DA310
  78: { url: cdw('4981627'), source: 'cdw' },      // DA300
  82: { url: cdw('5852990'), source: 'cdw' },      // USB-C to HDMI/DP
  83: { url: cdw('5852990'), source: 'cdw' },      // USB-C to HDMI
  80: { url: cdw('5852990'), source: 'cdw' },      // DisplayPort to VGA
  81: { url: cdw('5852990'), source: 'cdw' },      // HDMI to VGA
  84: { url: cdw('6454202'), source: 'cdw' },      // USB-C to 2.5G Ethernet

  // ===== DELL COMPUTERS =====
  4: { url: cdw('7852458'), source: 'cdw' },       // OptiPlex 7020 SFF
  5: { url: cdw('7879139'), source: 'cdw' },       // OptiPlex 7420 AIO
  9: { url: cdw('8406194'), source: 'cdw' },       // Pro 13 Plus PB13250
  8: { url: cdw('8406194'), source: 'cdw' },       // Pro 13 Premium PA13250 (same chassis)
  13: { url: cdw('8406202'), source: 'cdw' },      // Pro 14 Plus PB14250 Ultra 7
  10: { url: cdw('8370901'), source: 'cdw' },      // Pro 14 Plus PB14250 Ultra 5
  11: { url: cdw('8370901'), source: 'cdw' },      // Pro 14 PC14250
  14: { url: cdw('8314217'), source: 'cdw' },      // XPS 13 9350
  7: { url: cdw('7913504'), source: 'cdw' },       // Latitude 7350 Detachable
  6: { url: cdw('7886952'), source: 'cdw' },       // Latitude 3450

  // ===== DELL BAGS & CASES =====
  52: { url: cdw('6928146'), source: 'cdw' },      // CC5425C (using CC5623 similar)
  65: { url: cdw('6928146'), source: 'cdw' },      // CC5623
  66: { url: cdw('7463823'), source: 'cdw' },      // CC5624S
  56: { url: cdw('8053112'), source: 'cdw' },      // CC7625
  63: { url: cdw('9048246'), source: 'cdw' },      // CC5626
  53: { url: cdw('6928146'), source: 'cdw' },      // CV5423 (similar sleeve)
  54: { url: cdw('6928150'), source: 'cdw' },      // CV5623
  55: { url: cdw('6928146'), source: 'cdw' },      // PE1520C (similar briefcase)
  57: { url: cdw('7754623'), source: 'cdw' },      // CP3724
  58: { url: cdw('8053124'), source: 'cdw' },      // CP7625
  59: { url: cdw('6889024'), source: 'cdw' },      // CP4523G
  60: { url: cdw('6928145'), source: 'cdw' },      // CP5723
  61: { url: cdw('7463822'), source: 'cdw' },      // CP5724S
  64: { url: cdw('8421492'), source: 'cdw' },      // CP5625G
  51: { url: cdw('6928146'), source: 'cdw' },      // Carry Case Rugged (similar)
  62: { url: cdw('6928145'), source: 'cdw' },      // GM1720PM Gaming Backpack (using CP5723)

  // ===== DELL POWER & LOCKS =====
  71: { url: cdw('7945578'), source: 'cdw' },      // Dell 65W Adapter
  72: { url: cdw('7945578'), source: 'cdw' },      // Dell 65W Type-C Adapter
  75: { url: cdw('7945578'), source: 'cdw' },      // Dell Power Bank PW7015L

  // ===== JABRA =====
  97: { url: cdw('3521185'), source: 'cdw' },      // Evolve 65 TE (using Evolve 20 as similar shape)
  91: { url: cdw('3521185'), source: 'cdw' },      // Evolve 20 MS Stereo
  92: { url: cdw('8309629'), source: 'cdw' },      // Evolve 20 MS Stereo USB-C
  93: { url: cdw('8404252'), source: 'cdw' },      // Evolve 30 II
  96: { url: cdw('7500727'), source: 'cdw' },      // Evolve 40 MS (using Evolve2 40 SE)
  95: { url: cdw('7412456'), source: 'cdw' },      // Evolve2 55
  98: { url: cdw('7412482'), source: 'cdw' },      // Evolve2 65 Flex
  90: { url: cdw('3521185'), source: 'cdw' },      // Evolve2 30 SE (similar to Evolve 20)
  88: { url: cdw('3259192'), source: 'cdw' },      // BIZ 2300 QD Duo
  89: { url: cdw('3285487'), source: 'cdw' },      // BIZ 2300 USB Duo
  99: { url: cdw('4076933'), source: 'cdw' },      // BIZ 1500 USB Duo
  87: { url: cdw('7412482'), source: 'cdw' },      // PanaCast 50 Screen Mount (using headset placeholder)

  // ===== JABRA ACCESSORIES =====
  100: { url: cdw('3285487'), source: 'cdw' },     // Jabra Link 230 (using BIZ 2300 placeholder)
  101: { url: cdw('3285487'), source: 'cdw' },     // Jabra Link 265
  102: { url: cdw('3285487'), source: 'cdw' },     // Jabra GN1200 Cable
  103: { url: cdw('3285487'), source: 'cdw' },     // Jabra Remote Control
  104: { url: cdw('3521185'), source: 'cdw' },     // Jabra Ear Cushions
  105: { url: cdw('3285487'), source: 'cdw' },     // Jabra Engage Link

  // ===== DELL HEADSET =====
  86: { url: cdw('8017057'), source: 'cdw' },      // Dell WL7024

  // ===== POLY =====
  106: { url: cdw('7597259'), source: 'cdw' },     // Blackwire C3220 (using 3210)
  107: { url: cdw('7597259'), source: 'cdw' },     // Poly HIS Cable (using Blackwire placeholder)

  // ===== PRINTERS =====
  112: { url: cdw('6402113'), source: 'cdw' },     // HP M480f
  113: { url: cdw('7432123'), source: 'cdw' },     // Lexmark MS531dw

  // ===== XEROX TONERS (using VersaLink C7000 series as they're visually similar) =====
  130: { url: cdw('4636472'), source: 'cdw' },     // 106R03745 Black
  131: { url: cdw('4636474'), source: 'cdw' },     // 106R03748 Cyan (using magenta CDW but similar box)
  132: { url: cdw('4636474'), source: 'cdw' },     // 106R03746 Yellow
  133: { url: cdw('4636474'), source: 'cdw' },     // 106R03747 Magenta

  // ===== NETWORKING =====
  108: { url: cdw('8331727'), source: 'cdw' },     // Ubiquiti U7-Pro

  // ===== LENOVO =====
  15: { url: cdw('7886952'), source: 'cdw' },      // ThinkBook 15 (using Latitude placeholder - will fix)
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
    // CDW images should be > 3KB
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
  const batchSize = 5;

  for (let i = 0; i < ids.length; i += batchSize) {
    const batch = ids.slice(i, i + batchSize);
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

        if (error) {
          console.log(`  ERROR updating ${id}: ${error.message}`);
          failed++;
        } else {
          console.log(`  ✓ ${id} updated`);
          updated++;
        }
      } else {
        console.log(`  ✗ ${id} image not valid: ${url.slice(0, 60)}...`);
        failed++;
      }
    }

    // Small delay between batches
    if (i + batchSize < ids.length) {
      await new Promise(r => setTimeout(r, 300));
    }
  }

  console.log(`\n========================================`);
  console.log(`Updated: ${updated}`);
  console.log(`Failed:  ${failed}`);
  console.log(`========================================`);

  // Show final stats
  const { data: withImages } = await supabase
    .from('products')
    .select('id')
    .not('image_main', 'is', null);

  const { data: total } = await supabase
    .from('products')
    .select('id');

  console.log(`\nProducts with images: ${withImages?.length || 0} / ${total?.length || 0}`);
}

main().catch(console.error);
