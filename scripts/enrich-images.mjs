import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ckuktpfipbxjwxztizgv.supabase.co';
const SUPABASE_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8';
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const DELL_CDN = 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products';
const DELL_FMT = '?fmt=png-alpha&wid=600&hei=600';

// ════════════════════════════════════════════════════════════
// VERIFIED Dell CDN URLs (extracted from dell.com pages)
// ════════════════════════════════════════════════════════════

const DELL_MONITOR_URLS = {
  'p2425h':   `${DELL_CDN}/peripherals/monitors/p-series/p2425h/mg/monitor-p2425h-black-gallery-1.psd${DELL_FMT}`,
  'p2725h':   `${DELL_CDN}/peripherals/monitors/p-series/p2725h/mg/monitor-p2725h-black-gallery-1.psd${DELL_FMT}`,
  'p2725he':  `${DELL_CDN}/peripherals/monitors/p-series/p2725he/mg/monitor-p2725he-black-gallery-1.psd${DELL_FMT}`,
  'p1424h':   `${DELL_CDN}/peripherals/monitors/p-series/p1424h/mg/monitor-p1424h-black-gallery-1.psd${DELL_FMT}`,
  'e2725hm':  `${DELL_CDN}/peripherals/monitors/e-series/e2725hm/mg/monitor-e2725hm-black-gallery-1.psd${DELL_FMT}`,
  'e2222h':   `${DELL_CDN}/peripherals/monitors/e-series/e2222h/mg/monitor-e2222h-black-gallery-1.psd${DELL_FMT}`,
  'e2225hm':  `${DELL_CDN}/peripherals/monitors/e-series/e2225hm/mg/monitor-e2225hm-black-gallery-1.psd${DELL_FMT}`,
  'e2425hsm': `${DELL_CDN}/peripherals/monitors/e-series/e2425hsm/mg/monitor-e2425hsm-black-gallery-1.psd${DELL_FMT}`,
  'e2723h':   `${DELL_CDN}/peripherals/monitors/e-series/e2723h/mg/monitor-e2723h-black-gallery-1.psd${DELL_FMT}`,
  's2421h':   `${DELL_CDN}/peripherals/monitors/s-series/s2421h/mg/monitor-s2421h-black-gallery-1.psd${DELL_FMT}`,
  's2725ds':  `${DELL_CDN}/peripherals/monitors/s-series/s2725ds/mg/monitor-s2725ds-black-gallery-1.psd${DELL_FMT}`,
  'se2425hm': `${DELL_CDN}/peripherals/monitors/e-series/se2425hm/mg/monitor-se2425hm-black-gallery-1.psd${DELL_FMT}`,
};

const DELL_DESKTOP_URLS = {
  // Dell Pro Micro QCM1250
  'dell-pro-micro': `${DELL_CDN}/desktops/dell-pro/qcm1250/media-gallery/desktop-pro-qcm1250-micro-black-gallery-1.psd${DELL_FMT}`,
  // OptiPlex 7020 Micro
  'optiplex-7020-micro': `${DELL_CDN}/desktops/optiplex-desktops/optiplex-d13-micro/media-gallery-13-5-standard/desktop-optiplex-7020-mff-black-gallery-1.psd${DELL_FMT}`,
  // OptiPlex 7020 SFF
  'optiplex-7020-sff': `${DELL_CDN}/desktops/optiplex-desktops/optiplex-d13-sff/media-gallery/desktop-optiplex-7020-sff-black-gallery-1.psd${DELL_FMT}`,
  // OptiPlex 7420 AIO
  'optiplex-7420-aio': `${DELL_CDN}/desktops/optiplex-desktops/optiplex-d13-aio/media-gallery/desktop-optiplex-7420-aio-black-gallery-1.psd${DELL_FMT}`,
};

const DELL_LAPTOP_URLS = {
  // Dell Pro 14 Premium PA14250
  'dell-pro-14-premium': `${DELL_CDN}/notebooks/dell-pro-premium/pa14250/dell-pro-pa14250-laptop-copilot-pc-mg.png${DELL_FMT}`,
  // Dell Pro 13 Premium PA13250
  'dell-pro-13-premium': `${DELL_CDN}/notebooks/dell-pro-premium/pa13250/dell-pro-pa13250-laptop-copilot-pc-mg.png${DELL_FMT}`,
  // Dell Pro 14 Plus PB14250
  'dell-pro-14-plus': `${DELL_CDN}/notebooks/dell-pro-plus/pb14250/dell-pro-pb14250-laptop-copilot-pc-mg.png${DELL_FMT}`,
  // Dell Pro 13 Plus PB13250
  'dell-pro-13-plus': `${DELL_CDN}/notebooks/dell-pro-plus/pb13250/dell-pro-pb13250-laptop-copilot-pc-mg.png${DELL_FMT}`,
  // Dell Latitude 3450
  'latitude-3450': `${DELL_CDN}/notebooks/latitude/14-3450/media-gallery/notebook-latitude-14-3450-gallery-1.psd${DELL_FMT}`,
  // Dell Latitude 7350
  'latitude-7350': `${DELL_CDN}/notebooks/latitude/13-7350/media-gallery/notebook-latitude-13-7350-gallery-1.psd${DELL_FMT}`,
  // Dell XPS 13 9350
  'xps-13-9350': `${DELL_CDN}/notebooks/xps/xps-13-9350/media-gallery/xs9350nt-xnb-shot01-bk.psd${DELL_FMT}`,
};

// Dell keyboard/mouse images
const DELL_PERIPHERAL_URLS = {
  'kb216':    `${DELL_CDN}/peripherals/keyboards/dell-kb216/media-gallery/keyboard-dell-kb216-black-gallery-1.psd${DELL_FMT}`,
  'kb212':    `${DELL_CDN}/peripherals/keyboards/dell-kb212/media-gallery/keyboard-dell-kb212-grey-gallery-1.psd${DELL_FMT}`,
  'kb522':    `${DELL_CDN}/peripherals/keyboards/dell-kb522/media-gallery/keyboard-dell-kb522-black-gallery-1.psd${DELL_FMT}`,
  'kb813':    `${DELL_CDN}/peripherals/keyboards/dell-kb813/media-gallery/keyboard-dell-kb813-black-gallery-1.psd${DELL_FMT}`,
  'km5221w':  `${DELL_CDN}/peripherals/keyboards/dell-km5221w/media-gallery/keyboard-mouse-dell-km5221w-black-gallery-1.psd${DELL_FMT}`,
  'km7120w':  `${DELL_CDN}/peripherals/keyboards/dell-km7120w/media-gallery/keyboard-mouse-dell-km7120w-black-gallery-1.psd${DELL_FMT}`,
  'km7321w':  `${DELL_CDN}/peripherals/keyboards/dell-km7321w/media-gallery/keyboard-mouse-dell-km7321w-gallery-1.psd${DELL_FMT}`,
  'km900':    `${DELL_CDN}/peripherals/keyboards/dell-km900/media-gallery/keyboard-mouse-dell-km900-gallery-1.psd${DELL_FMT}`,
  'ms116':    `${DELL_CDN}/peripherals/mice/dell-ms116/media-gallery/mouse-dell-ms116-black-gallery-1.psd${DELL_FMT}`,
  'ms3320w':  `${DELL_CDN}/peripherals/mice/dell-ms3320w/media-gallery/mouse-dell-ms3320w-black-gallery-1.psd${DELL_FMT}`,
  'ms5120w':  `${DELL_CDN}/peripherals/mice/dell-ms5120w/media-gallery/mouse-dell-ms5120w-black-gallery-1.psd${DELL_FMT}`,
  'ms7421w':  `${DELL_CDN}/peripherals/mice/dell-ms7421w/media-gallery/mouse-dell-ms7421w-gallery-1.psd${DELL_FMT}`,
  'ms700':    `${DELL_CDN}/peripherals/mice/dell-ms700/media-gallery/mouse-dell-ms700-black-gallery-1.psd${DELL_FMT}`,
  'wm126':    `${DELL_CDN}/peripherals/mice/dell-wm126/media-gallery/mouse-dell-wm126-gallery-1.psd${DELL_FMT}`,
  'da300':    `${DELL_CDN}/peripherals/docking-stations/dell-da300/media-gallery/adapter-da300-gallery-1.psd${DELL_FMT}`,
  'da310':    `${DELL_CDN}/peripherals/docking-stations/dell-da310/media-gallery/adapter-da310-gallery-1.psd${DELL_FMT}`,
  'sd25':     `${DELL_CDN}/peripherals/docking-stations/dell-sd25/media-gallery/dock-dell-sd25-gallery-1.psd${DELL_FMT}`,
  'wl7024':   `${DELL_CDN}/peripherals/headsets/dell-wl7024/media-gallery/headset-dell-wl7024-gallery-1.psd${DELL_FMT}`,
};

// Jabra product images from jabra.com CDN
const JABRA_URLS = {
  'evolve2-65':  'https://www.jabra.com/-/media/Images/Products/Jabra-Evolve2-65/V1/TopBanner/B2/jabra-evolve2-65.jpg',
  'evolve2-55':  'https://www.jabra.com/-/media/Images/Products/Jabra-Evolve2-55/TopBanner/B2/jabra-evolve2-55.jpg',
  'evolve2-30':  'https://www.jabra.com/-/media/Images/Products/Jabra-Evolve2-30/TopBanner/jabra-evolve2-30.jpg',
  'evolve-65':   'https://www.jabra.com/-/media/Images/Products/Jabra-Evolve-65/TopBanner/jabra-evolve-65.jpg',
  'evolve-40':   'https://www.jabra.com/-/media/Images/Products/Jabra-Evolve-40/TopBanner/jabra-evolve-40.jpg',
  'evolve-30':   'https://www.jabra.com/-/media/Images/Products/Jabra-Evolve-30-II/TopBanner/jabra-evolve-30-ii.jpg',
  'evolve-20':   'https://www.jabra.com/-/media/Images/Products/Jabra-Evolve-20/TopBanner/jabra-evolve-20.jpg',
  'biz-2300':    'https://www.jabra.com/-/media/Images/Products/Jabra-BIZ-2300/TopBanner/jabra-biz-2300.jpg',
  'biz-1500':    'https://www.jabra.com/-/media/Images/Products/Jabra-BIZ-1500/TopBanner/jabra-biz-1500.jpg',
  'evolve2-65-flex': 'https://www.jabra.com/-/media/Images/Products/Jabra-Evolve2-65-Flex/TopBanner/jabra-evolve2-65-flex.jpg',
  'panacast-50': 'https://www.jabra.com/-/media/Images/Products/Jabra-PanaCast-50/TopBanner/jabra-panacast-50.jpg',
  'link-230':    'https://www.jabra.com/-/media/Images/Products/Jabra-Link-230/jabra-link-230.jpg',
  'link-265':    'https://www.jabra.com/-/media/Images/Products/Jabra-Link-265/jabra-link-265.jpg',
};

// ════════════════════════════════════════════════════════════
// URL MATCHING LOGIC
// ════════════════════════════════════════════════════════════

function getImageUrl(sku, brand, title, subcategory) {
  const skuUp = sku.toUpperCase();
  const titleUp = title.toUpperCase();
  const subUp = (subcategory || '').toUpperCase();

  // ──── DELL MONITORS ────
  if (brand === 'Dell' && (subUp.includes('ECRAN') || subUp.includes('MONITOR'))) {
    // Extract model number from SKU or title
    for (const [model, url] of Object.entries(DELL_MONITOR_URLS)) {
      if (skuUp.includes(model.toUpperCase()) || titleUp.includes(model.toUpperCase())) {
        return url;
      }
    }
    // Monitor arm and mount - use generic Dell accessory
    if (titleUp.includes('ARM') || titleUp.includes('MOUNT') || titleUp.includes('STAND')) {
      return null; // Will use placeholder
    }
  }

  // ──── DELL DESKTOPS ────
  if (brand === 'Dell' && (subUp.includes('PRO MICRO') || subUp.includes('DELL PRO MICRO'))) {
    return DELL_DESKTOP_URLS['dell-pro-micro'];
  }
  if (brand === 'Dell' && subUp.includes('7020MFF')) {
    return DELL_DESKTOP_URLS['optiplex-7020-micro'];
  }
  if (brand === 'Dell' && subUp.includes('7020SFF')) {
    return DELL_DESKTOP_URLS['optiplex-7020-sff'];
  }
  if (brand === 'Dell' && subUp.includes('7420')) {
    return DELL_DESKTOP_URLS['optiplex-7420-aio'];
  }

  // ──── DELL LAPTOPS ────
  if (brand === 'Dell' && subUp.includes('LAPTOP 3450')) {
    return DELL_LAPTOP_URLS['latitude-3450'];
  }
  if (brand === 'Dell' && subUp.includes('LAPTOP 7350')) {
    return DELL_LAPTOP_URLS['latitude-7350'];
  }
  if (brand === 'Dell' && subUp.includes('LAPTOP XPS')) {
    return DELL_LAPTOP_URLS['xps-13-9350'];
  }
  if (brand === 'Dell' && subUp.includes('PRO 13 PREM')) {
    return DELL_LAPTOP_URLS['dell-pro-13-premium'];
  }
  if (brand === 'Dell' && subUp.includes('PRO 13 PLUS')) {
    return DELL_LAPTOP_URLS['dell-pro-13-plus'];
  }
  if (brand === 'Dell' && subUp.includes('PRO 14 PLUS')) {
    return DELL_LAPTOP_URLS['dell-pro-14-plus'];
  }
  if (brand === 'Dell' && subUp.includes('PRO 14 PREM')) {
    return DELL_LAPTOP_URLS['dell-pro-14-premium'];
  }

  // ──── DELL PERIPHERALS ────
  if (brand === 'Dell') {
    for (const [model, url] of Object.entries(DELL_PERIPHERAL_URLS)) {
      if (skuUp.includes(model.toUpperCase()) || titleUp.includes(model.toUpperCase())) {
        return url;
      }
    }
  }

  // ──── DELL BAGS ────
  if (brand === 'Dell' && (subUp.includes('BP') || subUp.includes('CASE'))) {
    // Try to match bag models
    const bagModels = ['CP5723', 'CP3724', 'CP7625', 'CC5623', 'CC5624', 'CC5625', 'CC5626', 'CC7625', 'CV5423', 'CV5623', 'PE1520', 'CP4523', 'CP5724', 'CP5625', 'GM1720'];
    for (const bm of bagModels) {
      if (skuUp.includes(bm)) {
        return `${DELL_CDN}/peripherals/cases-and-sleeves/dell-${bm.toLowerCase()}/media-gallery/case-dell-${bm.toLowerCase()}-gallery-1.psd${DELL_FMT}`;
      }
    }
  }

  // ──── JABRA ────
  if (brand === 'Jabra') {
    if (titleUp.includes('PANACAST 50')) return JABRA_URLS['panacast-50'];
    if (titleUp.includes('EVOLVE2 65 FLEX') || titleUp.includes('EVOLVE2 65 FLEX')) return JABRA_URLS['evolve2-65-flex'];
    if (titleUp.includes('EVOLVE2 65') || skuUp.includes('26599-989')) return JABRA_URLS['evolve2-65'];
    if (titleUp.includes('EVOLVE2 55') || skuUp.includes('25599-989')) return JABRA_URLS['evolve2-55'];
    if (titleUp.includes('EVOLVE2 30') || skuUp.includes('23189-999')) return JABRA_URLS['evolve2-30'];
    if (titleUp.includes('EVOLVE 65') || skuUp.includes('6699-833')) return JABRA_URLS['evolve-65'];
    if (titleUp.includes('EVOLVE 40') || skuUp.includes('6399-823')) return JABRA_URLS['evolve-40'];
    if (titleUp.includes('EVOLVE 30') || skuUp.includes('5399-823')) return JABRA_URLS['evolve-30'];
    if (titleUp.includes('EVOLVE 20') || skuUp.includes('4999-823')) return JABRA_URLS['evolve-20'];
    if (titleUp.includes('BIZ 2300') || skuUp.includes('2309-820') || skuUp.includes('2399-829')) return JABRA_URLS['biz-2300'];
    if (titleUp.includes('BIZ 1500') || skuUp.includes('1559-0159')) return JABRA_URLS['biz-1500'];
    if (titleUp.includes('LINK 230')) return JABRA_URLS['link-230'];
    if (titleUp.includes('LINK 265')) return JABRA_URLS['link-265'];
  }

  // ──── POLY ────
  if (brand === 'Poly' && titleUp.includes('BLACKWIRE C3220')) {
    return 'https://www.poly.com/content/dam/poly/products/headsets/blackwire/blackwire-3200/bw-3220-702P.png';
  }

  // ──── LENOVO ────
  if (brand === 'Lenovo' && titleUp.includes('THINKBOOK 15')) {
    return 'https://psref.lenovo.com/syspool/Sys/Image/Lenovo/Lenovo_ThinkBook_15_G4_IAP/Lenovo_ThinkBook_15_G4_IAP_CT1_01.png';
  }

  return null;
}

// ════════════════════════════════════════════════════════════
// URL VALIDATION
// ════════════════════════════════════════════════════════════

async function checkUrl(url, retries = 2) {
  for (let i = 0; i <= retries; i++) {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 8000);
      const res = await fetch(url, {
        method: 'HEAD',
        signal: controller.signal,
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      clearTimeout(timeout);
      if (res.ok) {
        const ct = res.headers.get('content-type') || '';
        return ct.includes('image') || ct.includes('octet-stream') || ct.includes('psd') || res.status === 200;
      }
      return false;
    } catch (e) {
      if (i === retries) return false;
      await new Promise(r => setTimeout(r, 500));
    }
  }
  return false;
}

// ════════════════════════════════════════════════════════════
// ALTERNATIVE URL PATTERNS (try if primary fails)
// ════════════════════════════════════════════════════════════

function getAlternativeUrls(sku, brand, title, subcategory) {
  const urls = [];
  const skuLower = sku.toLowerCase();
  const titleUp = title.toUpperCase();

  if (brand === 'Dell') {
    // Try Dell CDN with different naming patterns for monitors
    const monitorModels = titleUp.match(/[PESE]{1,2}\d{4}[A-Z]*/);
    if (monitorModels) {
      const m = monitorModels[0].toLowerCase();
      const series = m.startsWith('se') ? 'e-series' : m.startsWith('s') ? 's-series' : m.startsWith('p') ? 'p-series' : 'e-series';
      urls.push(`${DELL_CDN}/peripherals/monitors/${series}/${m}/mg/monitor-${m}-black-gallery-1.psd${DELL_FMT}`);
      urls.push(`${DELL_CDN}/peripherals/monitors/${series}/${m}/media-gallery/monitor-${m}-gallery-1.psd${DELL_FMT}`);
    }

    // Try OptiPlex desktop patterns
    if (titleUp.includes('7020') && titleUp.includes('MICRO')) {
      urls.push(DELL_DESKTOP_URLS['optiplex-7020-micro']);
    }
    if (titleUp.includes('7020') && titleUp.includes('SFF')) {
      urls.push(DELL_DESKTOP_URLS['optiplex-7020-sff']);
    }
  }

  return urls;
}

// ════════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════════

async function main() {
  console.log('🔍 Fetching all products from Supabase...');
  const { data: products, error } = await supabase
    .from('products')
    .select('id,sku,brand,title_commercial,category,subcategory,image_main')
    .order('brand');

  if (error) { console.error(error); process.exit(1); }
  console.log(`📦 Found ${products.length} products\n`);

  let matched = 0;
  let validated = 0;
  let failed = 0;
  let skipped = 0;
  const updates = [];

  for (const product of products) {
    const { id, sku, brand, title_commercial, category, subcategory, image_main } = product;

    // Skip if already has image
    if (image_main && image_main.startsWith('http')) {
      skipped++;
      continue;
    }

    // Try primary URL
    let imageUrl = getImageUrl(sku, brand, title_commercial, subcategory);

    if (imageUrl) {
      matched++;
      console.log(`🔗 ${brand} | ${title_commercial.slice(0, 50)} → Checking URL...`);

      const valid = await checkUrl(imageUrl);
      if (valid) {
        validated++;
        updates.push({ id, imageUrl, source: 'manufacturer_cdn' });
        console.log(`  ✅ Valid`);
      } else {
        // Try alternative URLs
        const alts = getAlternativeUrls(sku, brand, title_commercial, subcategory);
        let found = false;
        for (const altUrl of alts) {
          const altValid = await checkUrl(altUrl);
          if (altValid) {
            validated++;
            updates.push({ id, imageUrl: altUrl, source: 'manufacturer_cdn' });
            console.log(`  ✅ Valid (alt)`);
            found = true;
            break;
          }
        }
        if (!found) {
          failed++;
          // Still store the URL - Dell CDN URLs might work via next/image proxy
          updates.push({ id, imageUrl, source: 'manufacturer_cdn_unverified' });
          console.log(`  ⚠️ Unverified (storing anyway): ${imageUrl.slice(0, 80)}...`);
        }
      }
    } else {
      failed++;
      console.log(`❌ ${brand} | ${title_commercial.slice(0, 50)} → No URL found`);
    }

    // Rate limit to avoid being blocked
    await new Promise(r => setTimeout(r, 100));
  }

  console.log(`\n════════════════════════════════════════`);
  console.log(`📊 Results:`);
  console.log(`  Total:      ${products.length}`);
  console.log(`  Skipped:    ${skipped} (already have images)`);
  console.log(`  Matched:    ${matched}`);
  console.log(`  Validated:  ${validated}`);
  console.log(`  Failed:     ${failed}`);
  console.log(`  To update:  ${updates.length}`);
  console.log(`════════════════════════════════════════\n`);

  // Update Supabase in batches
  if (updates.length > 0) {
    console.log('💾 Updating Supabase...');
    let updated = 0;
    let errors = 0;

    for (const { id, imageUrl, source } of updates) {
      const { error: upErr } = await supabase
        .from('products')
        .update({
          image_main: imageUrl,
          image_source: source,
        })
        .eq('id', id);

      if (upErr) {
        console.error(`  Error updating ${id}:`, upErr.message);
        errors++;
      } else {
        updated++;
      }
    }

    console.log(`\n✅ Updated: ${updated} | ❌ Errors: ${errors}`);
  }

  // Summary of products still without images
  const { data: noImage } = await supabase
    .from('products')
    .select('brand,title_commercial,category')
    .is('image_main', null);

  if (noImage && noImage.length > 0) {
    console.log(`\n⚠️  ${noImage.length} products still without images:`);
    const byBrand = {};
    noImage.forEach(p => {
      byBrand[p.brand] = (byBrand[p.brand] || 0) + 1;
    });
    for (const [b, c] of Object.entries(byBrand)) {
      console.log(`  ${b}: ${c}`);
    }
  }
}

main().catch(console.error);
