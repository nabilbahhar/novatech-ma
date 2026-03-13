import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  'https://ckuktpfipbxjwxztizgv.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNrdWt0cGZpcGJ4and4enRpemd2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MzM0Mjc4OCwiZXhwIjoyMDg4OTE4Nzg4fQ.ErKvH1J13OUOs-UNTlhKwZEFtCLGt92Jxi4eYl2iyb8'
);

const DELL_BASE = 'https://i.dell.com/is/image/DellContent/content/dam/ss2/product-images/dell-client-products';
const FMT = '?fmt=png-alpha&wid=600&hei=600';

// ════════════════════════════════════════════════════════
// Test image URL - returns true only for real images > 3KB
// ════════════════════════════════════════════════════════
async function testUrl(url) {
  try {
    const c = new AbortController();
    const t = setTimeout(() => c.abort(), 8000);
    const res = await fetch(url, {
      signal: c.signal,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' }
    });
    clearTimeout(t);
    if (!res.ok) return false;
    const buf = await res.arrayBuffer();
    return buf.byteLength > 3000; // Real images are > 3KB
  } catch { return false; }
}

// ════════════════════════════════════════════════════════
// Find first valid URL from candidates list
// ════════════════════════════════════════════════════════
async function findValidUrl(candidates) {
  for (const url of candidates) {
    const ok = await testUrl(url);
    if (ok) return url;
    await new Promise(r => setTimeout(r, 150));
  }
  return null;
}

// ════════════════════════════════════════════════════════
// Generate Dell monitor URL candidates
// ════════════════════════════════════════════════════════
function dellMonitorCandidates(model) {
  const m = model.toLowerCase();
  const series = m.startsWith('se') ? ['se-series', 'e-series']
    : m.startsWith('s') ? ['s-series']
    : m.startsWith('p') ? ['p-series']
    : ['e-series'];

  const candidates = [];
  for (const s of series) {
    candidates.push(
      `${DELL_BASE}/peripherals/monitors/${s}/${m}/mg/monitor-${m}-black-gallery-1.psd${FMT}`,
      `${DELL_BASE}/peripherals/monitors/${s}/${m}/media-gallery/monitor-${m}-black-gallery-1.psd${FMT}`,
      `${DELL_BASE}/peripherals/monitors/${s}/${m}/mg/monitor-${m}-gallery-1.psd${FMT}`,
      `${DELL_BASE}/peripherals/monitors/${s}-24/${m}/mg/monitor-${m}-black-gallery-1.psd${FMT}`,
      `${DELL_BASE}/peripherals/monitors/${s}-27/${m}/mg/monitor-${m}-black-gallery-1.psd${FMT}`,
      `${DELL_BASE}/peripherals/monitors/${s}-22/${m}/mg/monitor-${m}-black-gallery-1.psd${FMT}`,
    );
  }
  // Also try without series folder
  candidates.push(
    `${DELL_BASE}/peripherals/monitors/${m}/media-gallery/monitor-${m}-black-gallery-1.psd${FMT}`,
    `${DELL_BASE}/peripherals/monitors/${m}/mg/monitor-${m}-black-gallery-1.psd${FMT}`,
  );
  return candidates;
}

// ════════════════════════════════════════════════════════
// Generate Dell desktop URL candidates
// ════════════════════════════════════════════════════════
function dellDesktopCandidates(formFactor, modelNum) {
  const ff = formFactor.toLowerCase(); // micro, sff, aio
  const candidates = [];

  // OptiPlex patterns
  const optiFolders = [
    `optiplex-desktops/optiplex-d13-${ff}`,
    `optiplex-desktops/optiplex-${ff}`,
    `optiplex-desktops/${modelNum}-${ff}`,
    `optiplex/${modelNum}`,
  ];
  const optiNames = [
    `desktop-optiplex-${modelNum}-${ff === 'micro' ? 'mff' : ff}-black-gallery-1.psd`,
    `desktop-optiplex-${modelNum}-${ff}-black-gallery-1.psd`,
    `desktop-optiplex-${modelNum}-${ff}-gallery-1.psd`,
  ];
  const optiSubfolders = [
    'media-gallery-13-5-standard',
    'media-gallery',
    'mg',
  ];

  for (const folder of optiFolders) {
    for (const sub of optiSubfolders) {
      for (const name of optiNames) {
        candidates.push(`${DELL_BASE}/desktops/${folder}/${sub}/${name}${FMT}`);
      }
    }
  }

  return candidates;
}

// ════════════════════════════════════════════════════════
// Generate Dell laptop URL candidates
// ════════════════════════════════════════════════════════
function dellLaptopCandidates(modelLine, modelCode) {
  const candidates = [];
  const ml = modelLine.toLowerCase(); // latitude, xps, dell-pro, dell-pro-premium, dell-pro-plus

  // Dell Pro laptops
  if (ml.includes('pro')) {
    const subfolders = [
      `dell-pro-premium/${modelCode}`,
      `dell-pro-plus/${modelCode}`,
      `dell-pro/${modelCode}`,
    ];
    for (const sf of subfolders) {
      candidates.push(
        `${DELL_BASE}/notebooks/${sf}/dell-pro-${modelCode}-laptop-copilot-pc-mg.png${FMT}`,
        `${DELL_BASE}/notebooks/${sf}/media-gallery/notebook-dell-pro-${modelCode}-gallery-1.psd${FMT}`,
        `${DELL_BASE}/notebooks/${sf}/mg/notebook-dell-pro-${modelCode}-gallery-1.psd${FMT}`,
      );
    }
  }

  // Latitude laptops
  if (ml.includes('latitude') || ml.includes('3450') || ml.includes('7350')) {
    const sizes = ['14', '13', '15'];
    for (const size of sizes) {
      candidates.push(
        `${DELL_BASE}/notebooks/latitude/${size}-${modelCode}/media-gallery/notebook-latitude-${size}-${modelCode}-gallery-1.psd${FMT}`,
        `${DELL_BASE}/notebooks/latitude/${modelCode}/media-gallery/notebook-latitude-${modelCode}-gallery-1.psd${FMT}`,
      );
    }
  }

  // XPS laptops
  if (ml.includes('xps')) {
    candidates.push(
      `${DELL_BASE}/notebooks/xps/xps-13-${modelCode}/media-gallery/xs${modelCode}nt-xnb-shot01-bk.psd${FMT}`,
      `${DELL_BASE}/notebooks/xps/13-${modelCode}/media-gallery/notebook-xps-13-${modelCode}-gallery-1.psd${FMT}`,
      `${DELL_BASE}/notebooks/xps/${modelCode}/media-gallery/notebook-xps-${modelCode}-gallery-1.psd${FMT}`,
    );
  }

  return candidates;
}

// ════════════════════════════════════════════════════════
// Generate Dell peripheral URL candidates
// ════════════════════════════════════════════════════════
function dellPeripheralCandidates(type, model) {
  const m = model.toLowerCase();
  const candidates = [];

  if (type === 'keyboard' || type === 'combo') {
    const prefix = type === 'combo' ? 'keyboard-mouse' : 'keyboard';
    const folders = ['keyboards', 'input-devices'];
    for (const folder of folders) {
      candidates.push(
        `${DELL_BASE}/peripherals/${folder}/dell-${m}/media-gallery/${prefix}-dell-${m}-black-gallery-1.psd${FMT}`,
        `${DELL_BASE}/peripherals/${folder}/dell-${m}/media-gallery/${prefix}-dell-${m}-gallery-1.psd${FMT}`,
        `${DELL_BASE}/peripherals/${folder}/${m}/media-gallery/${prefix}-${m}-black-gallery-1.psd${FMT}`,
      );
    }
  }

  if (type === 'mouse') {
    const folders = ['mice', 'input-devices'];
    for (const folder of folders) {
      candidates.push(
        `${DELL_BASE}/peripherals/${folder}/dell-${m}/media-gallery/mouse-dell-${m}-black-gallery-1.psd${FMT}`,
        `${DELL_BASE}/peripherals/${folder}/dell-${m}/media-gallery/mouse-dell-${m}-gallery-1.psd${FMT}`,
        `${DELL_BASE}/peripherals/${folder}/${m}/media-gallery/mouse-${m}-black-gallery-1.psd${FMT}`,
      );
    }
  }

  if (type === 'bag') {
    candidates.push(
      `${DELL_BASE}/peripherals/cases-and-sleeves/dell-${m}/media-gallery/case-dell-${m}-gallery-1.psd${FMT}`,
      `${DELL_BASE}/peripherals/cases-and-sleeves/${m}/media-gallery/case-${m}-gallery-1.psd${FMT}`,
      `${DELL_BASE}/peripherals/bags-and-cases/dell-${m}/media-gallery/bag-dell-${m}-gallery-1.psd${FMT}`,
    );
  }

  if (type === 'dock' || type === 'adapter') {
    candidates.push(
      `${DELL_BASE}/peripherals/docking-stations/dell-${m}/media-gallery/dock-dell-${m}-gallery-1.psd${FMT}`,
      `${DELL_BASE}/peripherals/docking-stations/dell-${m}/media-gallery/adapter-dell-${m}-gallery-1.psd${FMT}`,
      `${DELL_BASE}/peripherals/docking-stations/${m}/media-gallery/adapter-${m}-gallery-1.psd${FMT}`,
    );
  }

  if (type === 'headset') {
    candidates.push(
      `${DELL_BASE}/peripherals/headsets/dell-${m}/media-gallery/headset-dell-${m}-gallery-1.psd${FMT}`,
      `${DELL_BASE}/peripherals/headsets/${m}/media-gallery/headset-${m}-gallery-1.psd${FMT}`,
    );
  }

  return candidates;
}

// ════════════════════════════════════════════════════════
// Product-to-URL mapping logic
// ════════════════════════════════════════════════════════
function getCandidates(sku, brand, title, subcategory) {
  const skuUp = sku.toUpperCase();
  const titleUp = title.toUpperCase();
  const subUp = (subcategory || '').toUpperCase();

  // ──── DELL MONITORS ────
  if (brand === 'Dell' && subUp.includes('ECRAN')) {
    const monitorMatch = titleUp.match(/([PSE]{1,2}\d{4}[A-Z]*)/);
    if (monitorMatch) {
      return dellMonitorCandidates(monitorMatch[1]);
    }
    // Try from SKU
    const skuMatch = skuUp.match(/DELL([PSE]{1,2}\d{4}[A-Z]*)/);
    if (skuMatch) {
      return dellMonitorCandidates(skuMatch[1]);
    }
  }

  // ──── DELL DESKTOPS ────
  if (brand === 'Dell' && subUp.includes('7020MFF')) {
    return dellDesktopCandidates('micro', '7020');
  }
  if (brand === 'Dell' && subUp.includes('7020SFF')) {
    return dellDesktopCandidates('sff', '7020');
  }
  if (brand === 'Dell' && subUp.includes('7420')) {
    return dellDesktopCandidates('aio', '7420');
  }

  // ──── DELL LAPTOPS ────
  if (brand === 'Dell' && subUp.includes('LAPTOP 3450')) {
    return dellLaptopCandidates('latitude-3450', '3450');
  }
  if (brand === 'Dell' && subUp.includes('LAPTOP 7350')) {
    return dellLaptopCandidates('latitude-7350', '7350');
  }
  if (brand === 'Dell' && subUp.includes('LAPTOP XPS')) {
    return dellLaptopCandidates('xps-9350', '9350');
  }
  if (brand === 'Dell' && (subUp.includes('PRO 13 PREM') || subUp.includes('PRO 14 PREM'))) {
    const code = subUp.includes('13') ? 'pa13250' : 'pa14250';
    return dellLaptopCandidates('pro-premium', code);
  }
  if (brand === 'Dell' && (subUp.includes('PRO 13 PLUS') || subUp.includes('PRO 14 PLUS'))) {
    const code = subUp.includes('13') ? 'pb13250' : 'pb14250';
    return dellLaptopCandidates('pro-plus', code);
  }

  // ──── DELL KEYBOARDS ────
  if (brand === 'Dell' && subUp.includes('KYB')) {
    const kbMatch = titleUp.match(/K[BM]\d{3,4}[A-Z]*/);
    if (kbMatch) {
      const model = kbMatch[0].toLowerCase();
      const type = model.startsWith('km') ? 'combo' : 'keyboard';
      return dellPeripheralCandidates(type, model);
    }
  }

  // ──── DELL MICE ────
  if (brand === 'Dell' && titleUp.match(/\b(MS\d{3,4}|WM\d{3})\b/)) {
    const mouseMatch = titleUp.match(/\b(MS\d{3,4}[A-Z]*|WM\d{3})\b/);
    if (mouseMatch) {
      return dellPeripheralCandidates('mouse', mouseMatch[1].toLowerCase());
    }
  }

  // ──── DELL BAGS ────
  if (brand === 'Dell' && (subUp.includes('BP') || subUp.includes('CASE'))) {
    const bagMatch = skuUp.match(/DELL(C[CPVG]\d{4}[A-Z]*)/);
    if (bagMatch) {
      return dellPeripheralCandidates('bag', bagMatch[1].toLowerCase());
    }
  }

  // ──── DELL DOCK ────
  if (brand === 'Dell' && subUp.includes('DOCK')) {
    return dellPeripheralCandidates('dock', 'sd25');
  }

  // ──── DELL HEADSET ────
  if (brand === 'Dell' && subUp.includes('CASQUE')) {
    return dellPeripheralCandidates('headset', 'wl7024');
  }

  // ──── DELL ADAPTERS ────
  if (brand === 'Dell' && titleUp.includes('DA3')) {
    const daMatch = titleUp.match(/DA\d{3}/);
    if (daMatch) {
      return dellPeripheralCandidates('adapter', daMatch[0].toLowerCase());
    }
  }

  return [];
}

// ════════════════════════════════════════════════════════
// MAIN
// ════════════════════════════════════════════════════════
async function main() {
  console.log('Fetching products without images...');
  const { data: products, error } = await supabase
    .from('products')
    .select('id,sku,brand,title_commercial,subcategory,image_main')
    .is('image_main', null)
    .in('brand', ['Dell', 'Jabra', 'Lenovo', 'HP', 'Poly'])
    .order('brand');

  if (error) { console.error(error); process.exit(1); }
  console.log(`Found ${products.length} products without images\n`);

  let found = 0;
  let notFound = 0;
  const updates = [];

  for (const p of products) {
    const candidates = getCandidates(p.sku, p.brand, p.title_commercial, p.subcategory);

    if (candidates.length === 0) {
      notFound++;
      continue;
    }

    process.stdout.write(`[${candidates.length} URLs] ${p.brand} ${p.title_commercial.slice(0,45)}... `);
    const validUrl = await findValidUrl(candidates);

    if (validUrl) {
      console.log('FOUND!');
      found++;
      updates.push({ id: p.id, url: validUrl });
    } else {
      console.log('not found');
      notFound++;
    }
  }

  console.log(`\n========================================`);
  console.log(`Found: ${found} | Not found: ${notFound}`);
  console.log(`========================================\n`);

  if (updates.length > 0) {
    console.log(`Updating ${updates.length} products...`);
    for (const { id, url } of updates) {
      await supabase.from('products').update({ image_main: url, image_source: 'manufacturer_cdn' }).eq('id', id);
    }
    console.log('Done!');
  }

  // Final count
  const { data: withImages } = await supabase
    .from('products')
    .select('id')
    .not('image_main', 'is', null);
  console.log(`\nTotal products with images: ${withImages?.length || 0} / 251`);
}

main().catch(console.error);
