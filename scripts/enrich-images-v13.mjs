import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

function cdw(id) {
  return `https://webobjects2.cdw.com/is/image/CDW/${id}?$product-detail$`;
}

// IMAGE_MAP: product_id -> image_url
const IMAGE_MAP = {
  // === JABRA AUDIO ACCESSORIES ===
  // Jabra Link 265 USB Headset Adapter - CDW 3351394
  101: cdw(3351394),
  // Jabra GN1200 CC 6' Headset Cable - CDW 963618
  102: cdw(963618),
  // Jabra Link 230 Headset Adapter - CDW 3512893
  100: cdw(3512893),
  // Jabra ear cushion 14101-46 for Evolve 20/30/40/65 - CDW 3757392
  104: cdw(3757392),

  // === POLY AUDIO ===
  // Poly HIS Direct Cable 72442-41 - CDW 2145811
  107: cdw(2145811),

  // === DELL ACCESSORIES ===
  // Dell Active Pen PN557W - CDW 4550932
  164: cdw(4550932),
  // Dell Premier Briefcase PE1520C - use CC5623 (same product line, similar design)
  55: cdw(6928146),
  // Dell EcoLoop Pro Classic Briefcase CC5425C - use CC5623 image (same line)
  52: cdw(6928146),
  // Dell Carry Case Rugged - use Targus rugged case for Dell CDW 6758883
  51: cdw(6758883),

  // === PHILIPS ===
  // Philips CCK4602/00 Calibration Kit - CDW 5010759
  171: cdw(5010759),
  // Philips EFK5535/00 Finisher Kit Haut/Bas pour 55BDL2005X - CDW 8160000
  172: cdw(8160000),
  // Philips EFK5565/00 Finisher Kit Droite/Gauche - same type as 5535, use same CDW image
  173: cdw(8160000),
  // Philips 58BFL2114/12 - 58" VA (use a close Philips B-Line TV - CDW 7466002)
  31: cdw(7466002),

  // === APC UPS ===
  // APC Easy UPS BV650I - use APC Back-UPS 650VA 230V CDW 701541 (same form factor)
  161: cdw(701541),

  // === CISCO ===
  // Cisco CAB-CEE77-C19-EU power cable - use Cisco CEE 7/7 power cable CDW 3158451
  150: cdw(3158451),

  // === DELL BAGS ===
  // HP Prelude Topload 4Z514AA - use HP Prelude Pro CDW 6196147
  68: cdw(6196147),

  // === LEXMARK ===
  // Lexmark 85D0HC0 Cyan Toner - use 84C1HC0 (same Lexmark cyan toner design) CDW 4011447
  118: cdw(4011447),

  // === D-LINK ===
  // D-Link DIR-615 - use Amazon product image
  155: 'https://m.media-amazon.com/images/I/41x-x1PPKZL._AC_SL1000_.jpg',

  // === SILICON POWER ===
  // Silicon Power Armor A60 1TB - Amazon image
  205: 'https://m.media-amazon.com/images/I/81cM1P-kDmL._AC_SL1500_.jpg',

  // === DELL INTERNAL COMPONENTS (generic placeholder images from CDW similar products) ===
  // Dell 8GB DDR5 PC RAM - use generic Dell memory CDW image
  223: cdw(7197383),  // reuse Dell OptiPlex mount as placeholder... skip
  // Better: use manufacturer-style images for RAM, batteries, SSDs

  // === UGREEN ACCESSORIES ===
  // UGREEN 50984 Dual USB-C Hub - Amazon
  177: 'https://m.media-amazon.com/images/I/61RnNFyNHBL._AC_SL1500_.jpg',
  // UGREEN 40289 Laptop Stand - Amazon
  176: 'https://m.media-amazon.com/images/I/61QLq3v8yYL._AC_SL1500_.jpg',
  // UGREEN 50737 USB-C to Ethernet - Amazon
  246: 'https://m.media-amazon.com/images/I/51VK9UQsRYL._AC_SL1500_.jpg',

  // === PORT DESIGN ===
  // Port Design Portland Backpack 15" 105330 - Amazon
  67: 'https://m.media-amazon.com/images/I/81JzJ-9sJBL._AC_SL1500_.jpg',

  // === GENERIC CABLES ===
  // Cable HDMI 3M
  184: 'https://m.media-amazon.com/images/I/61T+S8F-mOL._AC_SL1500_.jpg',
  // Cable HDMI 4K 10M
  183: 'https://m.media-amazon.com/images/I/61T+S8F-mOL._AC_SL1500_.jpg',
  // Cable HDMI/HDMI 3M
  240: 'https://m.media-amazon.com/images/I/61T+S8F-mOL._AC_SL1500_.jpg',
  // Cable USB
  186: 'https://m.media-amazon.com/images/I/61LpBTwoblL._AC_SL1500_.jpg',
  // Cable USB 3m
  241: 'https://m.media-amazon.com/images/I/61LpBTwoblL._AC_SL1500_.jpg',
  // Cable Type C/USB
  185: 'https://m.media-amazon.com/images/I/51HzCZNcN6L._AC_SL1500_.jpg',
  // Cable USB/RJ45 Console
  187: 'https://m.media-amazon.com/images/I/61aQvT2z3yL._AC_SL1200_.jpg',
  // Extension Cable USB 3.1 C(M)/C(F) 4.6m
  250: 'https://m.media-amazon.com/images/I/51HzCZNcN6L._AC_SL1500_.jpg',

  // === GENERIC ADAPTERS ===
  // Type C Multifonction Ethernet Adapter
  209: 'https://m.media-amazon.com/images/I/61RnNFyNHBL._AC_SL1500_.jpg',
  // Type C 3 Port Hub with Gigabit Ethernet
  210: 'https://m.media-amazon.com/images/I/61RnNFyNHBL._AC_SL1500_.jpg',
  // Carte Port Série
  188: 'https://m.media-amazon.com/images/I/61c0H2hcZ-L._AC_SL1200_.jpg',
  // Carte PCI avec port RJ11
  248: 'https://m.media-amazon.com/images/I/61c0H2hcZ-L._AC_SL1200_.jpg',

  // === MEMORY MODULES ===
  // Netac DDR4 SODIMM 3200MHz 8G
  242: 'https://m.media-amazon.com/images/I/51ks6K3qm5L._AC_SL1500_.jpg',
  // Hikvision DDR4 SODIMM 3200MHz 16G
  238: 'https://m.media-amazon.com/images/I/41Nxdm3I4gL._AC_SL1200_.jpg',
  // HSC408U32A01Z1 DDR4 UDIMM 3200MHz 8G (Hikvision)
  218: 'https://m.media-amazon.com/images/I/41Nxdm3I4gL._AC_SL1200_.jpg',
  // Innodisk 16GB DDR4
  227: 'https://m.media-amazon.com/images/I/41VFbB5CEOL._AC_SL1000_.jpg',
  // Innodisk 8GB DDR4
  226: 'https://m.media-amazon.com/images/I/41VFbB5CEOL._AC_SL1000_.jpg',
  // Innodisk 16GB DDR5
  225: 'https://m.media-amazon.com/images/I/41VFbB5CEOL._AC_SL1000_.jpg',
  // Innodisk 512GB SSD M.2 NVMe
  224: 'https://m.media-amazon.com/images/I/31yE7E0NpNL._AC_.jpg',
  // Silicon Power 4GB DDR4 SODIMM
  204: 'https://m.media-amazon.com/images/I/41VFbB5CEOL._AC_SL1000_.jpg',
  // Barette Mémoire 4GB Portable
  215: 'https://m.media-amazon.com/images/I/41VFbB5CEOL._AC_SL1000_.jpg',
  // Barette Mémoire 4GB PC
  216: 'https://m.media-amazon.com/images/I/41VFbB5CEOL._AC_SL1000_.jpg',
  // Barette Mémoire 4GB Serveur
  217: 'https://m.media-amazon.com/images/I/41VFbB5CEOL._AC_SL1000_.jpg',
  // Barette Mémoire 2GB Portable
  213: 'https://m.media-amazon.com/images/I/41VFbB5CEOL._AC_SL1000_.jpg',
  // Barette Mémoire 2GB Serveur
  214: 'https://m.media-amazon.com/images/I/41VFbB5CEOL._AC_SL1000_.jpg',
  // Barette Mémoire 16GB PC
  212: 'https://m.media-amazon.com/images/I/41VFbB5CEOL._AC_SL1000_.jpg',
  // UV70P-256G SSD M.2 NVMe 256GB
  193: 'https://m.media-amazon.com/images/I/31yE7E0NpNL._AC_.jpg',

  // === DELL MEMORY ===
  // Dell 8GB DDR5 PC
  223: 'https://m.media-amazon.com/images/I/51kkT8ERS3L._AC_SL1500_.jpg',
  // Dell 8GB DDR5 Portable
  222: 'https://m.media-amazon.com/images/I/51kkT8ERS3L._AC_SL1500_.jpg',
  // Dell 8GB DDR4 Portable
  221: 'https://m.media-amazon.com/images/I/51kkT8ERS3L._AC_SL1500_.jpg',
  // Dell 16GB DDR4 Portable
  220: 'https://m.media-amazon.com/images/I/51kkT8ERS3L._AC_SL1500_.jpg',
  // Dell 16GB DDR5 Portable
  219: 'https://m.media-amazon.com/images/I/51kkT8ERS3L._AC_SL1500_.jpg',
  // Dell 8GB DDR4 PC
  236: 'https://m.media-amazon.com/images/I/51kkT8ERS3L._AC_SL1500_.jpg',
  // Dell 8GB DDR3 PC
  237: 'https://m.media-amazon.com/images/I/51kkT8ERS3L._AC_SL1500_.jpg',

  // === DELL STORAGE ===
  // Dell 256GB SSD Portable
  192: 'https://m.media-amazon.com/images/I/31yE7E0NpNL._AC_.jpg',
  // Dell 512GB SSD NVMe
  196: 'https://m.media-amazon.com/images/I/31yE7E0NpNL._AC_.jpg',
  // Dell HDD 1TB SSD Portable
  200: 'https://m.media-amazon.com/images/I/31yE7E0NpNL._AC_.jpg',
  // HDD 2TB Toshiba PC
  201: 'https://m.media-amazon.com/images/I/71EBeDzCHdL._AC_SL1500_.jpg',
  // HDD 300GB SAS Serveur
  202: 'https://m.media-amazon.com/images/I/71EBeDzCHdL._AC_SL1500_.jpg',
  // Disque dur interne 1TB SATA portable
  191: 'https://m.media-amazon.com/images/I/71EBeDzCHdL._AC_SL1500_.jpg',
  // Lexar SSD LNS100-1TRB
  211: 'https://m.media-amazon.com/images/I/71TbD-4zWuL._AC_SL1500_.jpg',
  // Dell 0KG7NR Support disque dur R640
  239: 'https://m.media-amazon.com/images/I/61vN2RqTNPL._AC_SL1500_.jpg',

  // === DELL BATTERIES & POWER ===
  // Dell Battery E5480
  194: 'https://m.media-amazon.com/images/I/61P-FEWaXgL._AC_SL1500_.jpg',
  // Dell Battery 5420 63WHR
  181: 'https://m.media-amazon.com/images/I/61P-FEWaXgL._AC_SL1500_.jpg',
  // Dell Battery PRI 68WHR (GD1JP)
  199: 'https://m.media-amazon.com/images/I/61P-FEWaXgL._AC_SL1500_.jpg',
  // Dell Battery 1VY7F 68WHR
  182: 'https://m.media-amazon.com/images/I/61P-FEWaXgL._AC_SL1500_.jpg',
  // Dell Alimentation Serveur 1100W
  195: 'https://m.media-amazon.com/images/I/51zqVnONf1L._AC_SL1500_.jpg',
  // Dell 0PJMDN Alimentation serveur
  235: 'https://m.media-amazon.com/images/I/51zqVnONf1L._AC_SL1500_.jpg',

  // === DELL MISC ===
  // Dell LTO Tape Cleaning
  197: 'https://m.media-amazon.com/images/I/71SXfTG1oQL._AC_SL1500_.jpg',
  // Dell SAS Cable Mini to HD 2M
  198: 'https://m.media-amazon.com/images/I/61X0cL3y-bL._AC_SL1500_.jpg',
  // Dell Keyboard 82 FR
  203: 'https://m.media-amazon.com/images/I/71BsWcNLVqL._AC_SL1500_.jpg',
  // Dell 10GBASE-SR SFP+ (FS brand)
  154: 'https://m.media-amazon.com/images/I/51fvQNrMp8L._AC_SL1500_.jpg',

  // === NETWORKING ===
  // Cisco SFP 1G-SX-85 (FS brand)
  234: 'https://m.media-amazon.com/images/I/51fvQNrMp8L._AC_SL1500_.jpg',
  // Connecteur RJ45
  170: 'https://m.media-amazon.com/images/I/71z4QhYxGfL._AC_SL1500_.jpg',
  // Connecteur RJ45 Cat 6A UTP
  169: 'https://m.media-amazon.com/images/I/71z4QhYxGfL._AC_SL1500_.jpg',
  // Patch Cords 3m
  243: 'https://m.media-amazon.com/images/I/61Bqg5RQQAL._AC_SL1500_.jpg',

  // === FIBER OPTIC ===
  // Jarretiere F.O Multimode OM3 SC/LC 3M
  156: 'https://m.media-amazon.com/images/I/61WjVJVVlTL._AC_SL1500_.jpg',
  // Pigtail F.O Multimode OM3 SC
  157: 'https://m.media-amazon.com/images/I/61WjVJVVlTL._AC_SL1500_.jpg',
  // Traversee F.O SC Multimode Duplex
  158: 'https://m.media-amazon.com/images/I/41y8kHmGURL._AC_SL1000_.jpg',
  // Tiroir F.O 12 Ports SC
  159: 'https://m.media-amazon.com/images/I/61sFk2PJrSL._AC_SL1500_.jpg',

  // === MISC ACCESSORIES ===
  // Sheng Beier Laptop Sleeve 13"
  69: 'https://m.media-amazon.com/images/I/71TBzD-6R7L._AC_SL1500_.jpg',
  // Tapis Souris
  175: 'https://m.media-amazon.com/images/I/71Hx1X5aGPL._AC_SL1500_.jpg',
  // Tapis Souris COMPUCOM
  174: 'https://m.media-amazon.com/images/I/71Hx1X5aGPL._AC_SL1500_.jpg',
  // Pince cables réseaux
  208: 'https://m.media-amazon.com/images/I/61Md-s7SoJL._AC_SL1500_.jpg',
  // Testeur cables réseaux
  207: 'https://m.media-amazon.com/images/I/71PSQmXYkkL._AC_SL1500_.jpg',
  // Camera Stand Professional
  206: 'https://m.media-amazon.com/images/I/61aZ7oDAhOL._AC_SL1500_.jpg',
  // Socle sécurisable tablette (915125)
  178: 'https://m.media-amazon.com/images/I/51DfZR6EIxL._AC_SL1500_.jpg',
  // Cable de sécurité PC
  245: 'https://m.media-amazon.com/images/I/61HQeH7gJXL._AC_SL1500_.jpg',
  // Sac à dos roulettes laptop
  247: 'https://m.media-amazon.com/images/I/71uJwcNy-YL._AC_SL1500_.jpg',
  // Clé OTG USB/Type C
  189: 'https://m.media-amazon.com/images/I/61h1Rr1F8eL._AC_SL1500_.jpg',
  // Lecteur Code à barre HENEX HC-3206
  145: 'https://m.media-amazon.com/images/I/61MYPNPF3TL._AC_SL1500_.jpg',
  // DC coupler + AC Power Adapter Canon
  190: 'https://m.media-amazon.com/images/I/51PqPqgaB0L._AC_SL1200_.jpg',
  // iPhone 16 Cover
  233: 'https://m.media-amazon.com/images/I/61vfRoYLURL._AC_SL1500_.jpg',
  // Plateau Modem 19" P600
  251: 'https://m.media-amazon.com/images/I/51E8L-qHhwL._AC_SL1500_.jpg',

  // === PRINTING/LABELING ===
  // Ruban résine 110x74
  180: 'https://m.media-amazon.com/images/I/51LMQG5BUJL._AC_SL1200_.jpg',
  // Ruban TZ231 Brother 12mm
  179: 'https://m.media-amazon.com/images/I/61Mx0-mAtxL._AC_SL1500_.jpg',
  // Rouleau étiquette aluminium 50x30
  142: 'https://m.media-amazon.com/images/I/61SuGv5e+4L._AC_SL1000_.jpg',
  // Ruban résine noir
  141: 'https://m.media-amazon.com/images/I/51LMQG5BUJL._AC_SL1200_.jpg',

  // === DISPLAY ===
  // Philips 27BDL6112L LED panel P1.266
  166: cdw(8127097),  // reuse Philips dvLED panel CDW image from v11
  // Novastar TB60 Controller
  168: 'https://m.media-amazon.com/images/I/61dI-6V4TwL._AC_SL1200_.jpg',
  // Yealink WPP30 Wireless Presentation Pod
  162: 'https://m.media-amazon.com/images/I/51p2YhfK-nL._AC_SL1500_.jpg',

  // === NETWORKING MISC ===
  // Cisco CAB-TA-UK Power Cable
  167: cdw(3158451),
  // Ubiquiti E7
  109: 'https://m.media-amazon.com/images/I/31FPLqJBEsL._AC_SL1000_.jpg',

  // === IBM/LENOVO ===
  // 90Y8877 300GB 10K SAS 2.5" (IBM/Lenovo server HDD)
  165: 'https://m.media-amazon.com/images/I/71EBeDzCHdL._AC_SL1500_.jpg',
};

async function validateImage(url) {
  try {
    // Amazon blocks HEAD requests, use GET with range for CDW, trust Amazon URLs
    if (url.includes('m.media-amazon.com')) {
      const res = await fetch(url, {
        method: 'GET',
        headers: { 'Range': 'bytes=0-1023' },
        redirect: 'follow'
      });
      return res.ok || res.status === 206;
    }
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
      // Determine source
      const source = url.includes('cdw.com') ? 'cdw' : 'amazon';
      const { error } = await supabase
        .from('products')
        .update({ image_main: url, image_source: source })
        .eq('id', id);
      if (error) {
        console.log(`  ❌ DB error for ${id}: ${error.message}`);
        fail++;
        ok--;
      } else {
        console.log(`  ✅ ${id} - ${source}`);
      }
    } else {
      fail++;
      console.log(`  ❌ Invalid image for ${id}: ${url.substring(0, 60)}...`);
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
