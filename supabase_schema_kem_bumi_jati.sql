-- ============================================================
-- Supabase Table Schema: kem_bumi_jati
-- Purpose: Main configuration and content table for Kem Bumi Jati website
-- ============================================================

-- Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS kem_bumi_jati (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Content sections
  section_name TEXT NOT NULL,          -- e.g., "hero", "about", "facilities"
  section_key TEXT,                    -- Unique key within section
  content_title TEXT,                  -- Display title
  content_subtitle TEXT,               -- Display subtitle
  content_text TEXT,                   -- Main body text

  -- Media
  image_url TEXT,                      -- Featured image
  image_alt TEXT,                      -- Alt text for accessibility

  -- Status & Publishing
  is_active BOOLEAN DEFAULT TRUE,      -- Whether this record is active
  sort_order INTEGER DEFAULT 0,        -- Ordering priority
  published_at TIMESTAMPTZ,            -- When it was published

  -- Metadata
  created_by UUID,                       -- User who created (auth.users id)
  updated_by UUID,                       -- User who last updated
  tags JSONB DEFAULT '[]'::jsonb,      -- Optional tags for filtering

  -- Constraints
  UNIQUE (section_name, section_key)
);

-- ============================================================
-- Enable Row Level Security (RLS)
-- ============================================================
ALTER TABLE kem_bumi_jati ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Public Read Policies
-- ============================================================

-- Allow public read access to active records
CREATE POLICY "Public can view active records"
  ON kem_bumi_jati
  FOR SELECT
  TO public
  USING (is_active = TRUE);

-- Allow public read access to ordered records (for hero sliders etc.)
CREATE POLICY "Public can view ordered records"
  ON kem_bumi_jati
  FOR SELECT
  TO public
  USING (TRUE)
  ORDER BY sort_order ASC;

-- ============================================================
-- Admin/Authenticated Write Policies
-- ============================================================

-- Allow authenticated users to insert records
CREATE POLICY "Authenticated users can insert"
  ON kem_bumi_jati
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their own records
CREATE POLICY "Authenticated users can update"
  ON kem_bumi_jati
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete records
CREATE POLICY "Authenticated users can delete"
  ON kem_bumi_jati
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================================
-- Trigger: Update `updated_at` on every change
-- ============================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_kem_bumi_jati_updated_at
  BEFORE UPDATE ON kem_bumi_jati
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Indexes for Performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_kem_bumi_jati_section_name ON kem_bumi_jati (section_name);
CREATE INDEX IF NOT EXISTS idx_kem_bumi_jati_is_active ON kem_bumi_jati (is_active);
CREATE INDEX IF NOT EXISTS idx_kem_bumi_jati_sort_order ON kem_bumi_jati (sort_order);
CREATE INDEX IF NOT EXISTS idx_kem_bumi_jati_created_at ON kem_bumi_jati (created_at DESC);

-- ============================================================
-- Comment: Document the table structure
-- ============================================================
COMMENT ON TABLE kem_bumi_jati IS '
  Main configuration and content table for Kem Bumi Jati website.
  
  Stores various content sections including:
  - Hero section slides
  - About/latar-belakang content
  - Facilities information
  - Program/package details
  - General site configuration
  
  Each record represents a content block that can be
  rendered on the frontend via the Supabase API.
';

-- ============================================================
-- Example Insert Statements (Commented out)
-- ============================================================
/*
INSERT INTO kem_bumi_jati (section_name, section_key, content_title, content_subtitle, content_text, image_url, is_active, sort_order)
VALUES 
  ('hero', 'slide_1', 'SELAMAT DATANG KE KEM BUMI JATI', 'Pusat Latihan, Kem Motivasi & Aktiviti Berkumpulan.', 'Pusat latihan, kem motivasi dan pembangunan insan profesional sejak 1993 di Shah Alam, Selangor.', '/assets/hero-section-1.jpg', TRUE, 1),
  ('hero', 'slide_2', 'Jalan Kebun, Shah Alam, Selangor', '', 'Kem Bumi Jati merupakan pusat latihan dan kem motivasi profesional di bawah pengurusan ZH Warisan Holdings Sdn. Bhd.', '/assets/why-choose-1.jpg', TRUE, 2),
  ('about', 'latar_belakang', 'Latar Belakang', '', 'Isi tentang latar belakang kem bumi jati', '', TRUE, 1),
  ('facilities', 'dewan_kuliah', 'Dewan Kuliah', '', 'Maklumat tentang dewan kuliah', '', TRUE, 1);
*/