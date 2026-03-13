export interface Product {
  id: number
  sku: string
  brand: string
  category: string
  subcategory: string
  family_raw: string
  warehouse_zone: string
  title_raw: string
  title_commercial: string
  slug: string
  description_short: string
  description_long: string
  specs: Record<string, string>
  key_features: string[]
  tags: string[]

  stock_qty: number
  stock_incoming: number
  availability_status: "in_stock" | "low_stock" | "incoming" | "out_of_stock"
  last_checked_at: string
  internal_note: string

  image_main: string | null
  image_gallery: string[]
  image_source: string

  price_benchmark: number
  price_ht: number
  price_ttc: number
  price_crossed: number | null
  price_economy: number | null
  tva_rate: number

  badge_best_price: boolean
  badge_new: boolean
  badge_promo: boolean

  seo_title: string
  seo_description: string
  seo_keywords: string[]

  completeness_score: number
  status: "draft" | "published" | "archived"
  is_published: boolean
  sort_order: number

  created_at: string
  updated_at: string
  last_import_at: string

  brand_id: number
  category_id: number
}

export interface CartItem extends Product {
  qty: number
}

export interface Category {
  id: number
  slug: string
  name: string
  name_ar: string
  parent_id: number | null
  description: string
  seo_title: string
  seo_desc: string
  image_url: string
  icon: string
  sort_order: number
  product_count: number
  is_active: boolean
}

export interface Brand {
  id: number
  slug: string
  name: string
  logo_url: string
  banner_url: string
  description: string
  is_partner: boolean
  is_active: boolean
  sort_order: number
}

export interface Order {
  id: number
  order_number: string
  customer_name: string
  customer_email: string
  customer_phone: string
  customer_city: string
  delivery_address: string
  delivery_zone: string
  items: CartItem[]
  items_count: number
  subtotal_ht: number
  tva_amount: number
  total_ttc: number
  delivery_cost: number
  payment_method: "cash_on_delivery" | "cmi" | "bank_transfer" | "whatsapp"
  status: "pending" | "confirmed" | "processing" | "shipped" | "delivered" | "cancelled"
  tracking_number: string
  notes: string
  source: "website" | "whatsapp" | "phone"
  is_b2b: boolean
  company_name: string
  ice_number: string
  invoice_sent: boolean
  created_at: string
  updated_at: string
}

export interface Quote {
  id: number
  quote_number: string
  company_name: string
  contact_name: string
  contact_email: string
  contact_phone: string
  ice_number: string
  city: string
  project_type: string
  items: CartItem[]
  subtotal_ht: number
  total_ttc: number
  validity_days: number
  status: "pending" | "sent" | "accepted" | "rejected" | "expired"
  notes: string
  admin_notes: string
  pdf_url: string
  created_at: string
  updated_at: string
}
