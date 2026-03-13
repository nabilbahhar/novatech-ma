-- ============================================================
-- NOVATECH.MA — Schéma PostgreSQL / Supabase
-- Version 1.0 — Mars 2026
-- À exécuter dans Supabase > SQL Editor
-- ============================================================

-- Extension UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- TABLE: products
-- ============================================================
CREATE TABLE products (
  id                  SERIAL PRIMARY KEY,
  sku                 VARCHAR(100) UNIQUE NOT NULL,
  brand               VARCHAR(50),
  category            VARCHAR(100),
  subcategory         VARCHAR(100),
  family_raw          VARCHAR(100),
  warehouse_zone      VARCHAR(20),
  title_raw           TEXT,
  title_commercial    TEXT NOT NULL,
  slug                VARCHAR(250) UNIQUE NOT NULL,
  description_short   TEXT,
  description_long    TEXT,
  specs               JSONB DEFAULT '{}',
  key_features        TEXT[] DEFAULT '{}',
  tags                TEXT[] DEFAULT '{}',

  -- Stock
  stock_qty           INTEGER NOT NULL DEFAULT 0,
  stock_incoming      INTEGER DEFAULT 0,
  availability_status VARCHAR(30) DEFAULT 'out_of_stock',
  -- in_stock | low_stock | incoming | out_of_stock
  last_checked_at     TIMESTAMP,
  internal_note       TEXT,

  -- Images (URL Cloudinary ou Dell API)
  image_main          TEXT,
  image_gallery       TEXT[] DEFAULT '{}',
  image_source        VARCHAR(50), -- 'dell_api' | 'cloudinary' | 'manual'

  -- Pricing
  price_benchmark     DECIMAL(10,2),  -- prix marché observé
  price_ht            DECIMAL(10,2),
  price_ttc           DECIMAL(10,2),
  price_crossed       DECIMAL(10,2),  -- prix barré affiché
  price_economy       DECIMAL(10,2),  -- économie affichée
  tva_rate            DECIMAL(5,2) DEFAULT 20.0,

  -- Badges
  badge_best_price    BOOLEAN DEFAULT false,
  badge_new           BOOLEAN DEFAULT false,
  badge_promo         BOOLEAN DEFAULT false,

  -- SEO
  seo_title           TEXT,
  seo_description     TEXT,
  seo_keywords        TEXT[],

  -- Admin
  completeness_score  INTEGER DEFAULT 0,  -- 0-100
  status              VARCHAR(20) DEFAULT 'draft', -- draft | published | archived
  is_published        BOOLEAN DEFAULT false,
  sort_order          INTEGER DEFAULT 0,

  -- Timestamps
  created_at          TIMESTAMP DEFAULT NOW(),
  updated_at          TIMESTAMP DEFAULT NOW(),
  last_import_at      TIMESTAMP,

  -- Relations
  brand_id            INTEGER,
  category_id         INTEGER
);

-- Index recherche textuelle
CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_sku ON products(sku);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_status ON products(status, is_published);
CREATE INDEX idx_products_stock ON products(stock_qty DESC);
CREATE INDEX idx_products_search ON products USING gin(
  to_tsvector('french', coalesce(title_commercial,'') || ' ' || coalesce(brand,'') || ' ' || coalesce(sku,''))
);

-- ============================================================
-- TRIGGER: availability_status auto
-- ============================================================
CREATE OR REPLACE FUNCTION compute_availability()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.stock_qty > 10 THEN
    NEW.availability_status := 'in_stock';
  ELSIF NEW.stock_qty > 0 THEN
    NEW.availability_status := 'low_stock';
  ELSIF NEW.stock_incoming > 0 THEN
    NEW.availability_status := 'incoming';
  ELSE
    NEW.availability_status := 'out_of_stock';
  END IF;
  NEW.updated_at := NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_availability
  BEFORE INSERT OR UPDATE OF stock_qty, stock_incoming
  ON products FOR EACH ROW
  EXECUTE FUNCTION compute_availability();

-- ============================================================
-- TABLE: categories
-- ============================================================
CREATE TABLE categories (
  id            SERIAL PRIMARY KEY,
  slug          VARCHAR(100) UNIQUE NOT NULL,
  name          VARCHAR(100) NOT NULL,
  name_ar       VARCHAR(100),
  parent_id     INTEGER REFERENCES categories(id),
  description   TEXT,
  seo_title     TEXT,
  seo_desc      TEXT,
  image_url     TEXT,
  icon          VARCHAR(50),
  sort_order    INTEGER DEFAULT 0,
  product_count INTEGER DEFAULT 0,
  is_active     BOOLEAN DEFAULT true,
  created_at    TIMESTAMP DEFAULT NOW()
);

INSERT INTO categories (slug, name, sort_order) VALUES
  ('ordinateurs',    'Ordinateurs & PC',         1),
  ('ecrans',         'Écrans & Affichage',        2),
  ('accessoires',    'Accessoires',               3),
  ('audio',          'Casques & Audio Pro',       4),
  ('bagagerie',      'Bagagerie & Protection',    5),
  ('reseau',         'Réseau & Connectivité',     6),
  ('impression',     'Impression',                7);

-- ============================================================
-- TABLE: brands
-- ============================================================
CREATE TABLE brands (
  id            SERIAL PRIMARY KEY,
  slug          VARCHAR(100) UNIQUE NOT NULL,
  name          VARCHAR(100) NOT NULL,
  logo_url      TEXT,
  banner_url    TEXT,
  description   TEXT,
  is_partner    BOOLEAN DEFAULT false,
  is_active     BOOLEAN DEFAULT true,
  sort_order    INTEGER DEFAULT 0,
  created_at    TIMESTAMP DEFAULT NOW()
);

INSERT INTO brands (slug, name, is_partner, sort_order) VALUES
  ('dell',    'Dell',    true,  1),
  ('jabra',   'Jabra',   true,  2),
  ('lenovo',  'Lenovo',  false, 3),
  ('philips', 'Philips', false, 4),
  ('cisco',   'Cisco',   true,  5),
  ('poly',    'Poly',    false, 6),
  ('canon',   'Canon',   false, 7),
  ('hp',      'HP',      false, 8);

-- ============================================================
-- TABLE: orders
-- ============================================================
CREATE TABLE orders (
  id               SERIAL PRIMARY KEY,
  order_number     VARCHAR(20) UNIQUE NOT NULL,
  customer_name    VARCHAR(200) NOT NULL,
  customer_email   VARCHAR(200),
  customer_phone   VARCHAR(30) NOT NULL,
  customer_city    VARCHAR(100),
  delivery_address TEXT,
  delivery_zone    VARCHAR(50), -- casablanca | rabat | tanger | other
  items            JSONB NOT NULL DEFAULT '[]',
  items_count      INTEGER DEFAULT 0,
  subtotal_ht      DECIMAL(10,2),
  tva_amount       DECIMAL(10,2),
  total_ttc        DECIMAL(10,2),
  delivery_cost    DECIMAL(10,2) DEFAULT 0,
  payment_method   VARCHAR(50) DEFAULT 'cash_on_delivery',
  -- cash_on_delivery | cmi | bank_transfer | whatsapp
  status           VARCHAR(30) DEFAULT 'pending',
  -- pending | confirmed | processing | shipped | delivered | cancelled
  tracking_number  VARCHAR(100),
  notes            TEXT,
  source           VARCHAR(30) DEFAULT 'website', -- website | whatsapp | phone
  is_b2b           BOOLEAN DEFAULT false,
  company_name     VARCHAR(200),
  ice_number       VARCHAR(50),
  invoice_sent     BOOLEAN DEFAULT false,
  created_at       TIMESTAMP DEFAULT NOW(),
  updated_at       TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created ON orders(created_at DESC);
CREATE INDEX idx_orders_phone ON orders(customer_phone);

-- ============================================================
-- TABLE: quotes (devis B2B)
-- ============================================================
CREATE TABLE quotes (
  id               SERIAL PRIMARY KEY,
  quote_number     VARCHAR(20) UNIQUE NOT NULL,
  company_name     VARCHAR(200) NOT NULL,
  contact_name     VARCHAR(200),
  contact_email    VARCHAR(200),
  contact_phone    VARCHAR(30),
  ice_number       VARCHAR(50),
  city             VARCHAR(100),
  project_type     VARCHAR(100), -- datacenter | workstations | reseau | securite | autre
  items            JSONB NOT NULL DEFAULT '[]',
  subtotal_ht      DECIMAL(10,2),
  total_ttc        DECIMAL(10,2),
  validity_days    INTEGER DEFAULT 30,
  status           VARCHAR(20) DEFAULT 'pending',
  -- pending | sent | accepted | rejected | expired
  notes            TEXT,
  admin_notes      TEXT,
  pdf_url          TEXT,
  created_at       TIMESTAMP DEFAULT NOW(),
  updated_at       TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- TABLE: stock_alerts (alertes dispo)
-- ============================================================
CREATE TABLE stock_alerts (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER REFERENCES products(id) ON DELETE CASCADE,
  email       VARCHAR(200),
  phone       VARCHAR(30),
  notified    BOOLEAN DEFAULT false,
  notified_at TIMESTAMP,
  created_at  TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- TABLE: import_logs
-- ============================================================
CREATE TABLE import_logs (
  id             SERIAL PRIMARY KEY,
  filename       VARCHAR(200),
  source         VARCHAR(50) DEFAULT 'onedrive',
  rows_processed INTEGER DEFAULT 0,
  imported       INTEGER DEFAULT 0,
  updated        INTEGER DEFAULT 0,
  skipped        INTEGER DEFAULT 0,
  errors         INTEGER DEFAULT 0,
  error_details  JSONB DEFAULT '[]',
  status         VARCHAR(20) DEFAULT 'success',
  duration_ms    INTEGER,
  created_at     TIMESTAMP DEFAULT NOW()
);

-- ============================================================
-- TABLE: stock_history (dashboard analytics)
-- ============================================================
CREATE TABLE stock_history (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER REFERENCES products(id) ON DELETE CASCADE,
  stock_qty   INTEGER,
  recorded_at DATE DEFAULT CURRENT_DATE,
  UNIQUE(product_id, recorded_at)
);

-- ============================================================
-- TABLE: product_views (analytics produit)
-- ============================================================
CREATE TABLE product_views (
  id          SERIAL PRIMARY KEY,
  product_id  INTEGER REFERENCES products(id) ON DELETE CASCADE,
  viewed_date DATE DEFAULT CURRENT_DATE,
  views_count INTEGER DEFAULT 1,
  UNIQUE(product_id, viewed_date)
);

-- ============================================================
-- ROW LEVEL SECURITY (Supabase)
-- ============================================================
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE quotes ENABLE ROW LEVEL SECURITY;

-- Public: lire seulement les produits publiés
CREATE POLICY "products_public_read" ON products
  FOR SELECT USING (is_published = true AND status = 'published');

-- Service role: accès total (ETL, admin)
CREATE POLICY "products_service_all" ON products
  FOR ALL USING (auth.role() = 'service_role');

-- Orders: insertion publique (checkout), lecture service only
CREATE POLICY "orders_insert_public" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "orders_service_all" ON orders FOR ALL USING (auth.role() = 'service_role');

-- Quotes: insertion publique
CREATE POLICY "quotes_insert_public" ON quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "quotes_service_all" ON quotes FOR ALL USING (auth.role() = 'service_role');
