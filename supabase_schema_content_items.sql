-- ============================================================
-- Supabase Table Schema: content_items
-- Purpose: Dynamic content management for Fasiliti and Galeri
-- Allows creating/managing facilities and gallery items without
-- hardcoded values in the frontend
-- ============================================================

-- Create the table if it doesn't exist
CREATE TABLE IF NOT EXISTS content_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  -- Item identification
  name TEXT NOT NULL,                    -- Name of facility or gallery item
  description TEXT,                      -- Description text
  section TEXT NOT NULL,                 -- "fasiliti" or "galeri"
  slug TEXT GENERATED ALWAYS AS (LOWER(REGEXP_REPLACE(name, '\s+', '-', 'g'))) STORED,

  -- Media
  image_url TEXT,                        -- Featured image URL
  image_alt TEXT,                        -- Alt text for accessibility

  -- Status & Publishing
  is_active BOOLEAN DEFAULT TRUE,        -- Whether this item is visible
  sort_order INTEGER DEFAULT 0,          -- Ordering priority
  published_at TIMESTAMPTZ,              -- When it was published

  -- Metadata
  created_by UUID,                       -- User who created (auth.users id)
  updated_by UUID,                       -- User who last updated
  tags JSONB DEFAULT '[]'::jsonb,      -- Optional tags for filtering

  -- Constraints
  UNIQUE (section, slug),

  -- Check constraint to ensure valid section values
  CONSTRAINT valid_section CHECK (section IN ('fasiliti', 'galeri'))
);

-- ============================================================
-- Enable Row Level Security (RLS)
-- ============================================================
ALTER TABLE content_items ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- Public Read Policies
-- ============================================================

-- Allow public read access to active items
CREATE POLICY "Public can view active items"
  ON content_items
  FOR SELECT
  TO public
  USING (is_active = TRUE);

-- Allow public read access to ordered items (for sorting)
CREATE POLICY "Public can view ordered items"
  ON content_items
  FOR SELECT
  TO public
  USING (TRUE)
  ORDER BY sort_order ASC NULLS FIRST;

-- ============================================================
-- Admin/Authenticated Write Policies
-- ============================================================

-- Allow authenticated users to insert records
CREATE POLICY "Authenticated users can insert"
  ON content_items
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow authenticated users to update their own records
CREATE POLICY "Authenticated users can update"
  ON content_items
  FOR UPDATE
  TO authenticated
  USING (true);

-- Allow authenticated users to delete records
CREATE POLICY "Authenticated users can delete"
  ON content_items
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

CREATE TRIGGER update_content_items_updated_at
  BEFORE UPDATE ON content_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================
-- Indexes for Performance
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_content_items_section ON content_items (section);
CREATE INDEX IF NOT EXISTS idx_content_items_is_active ON content_items (is_active);
CREATE INDEX IF NOT EXISTS idx_content_items_sort_order ON content_items (section, sort_order);
CREATE INDEX IF NOT EXISTS idx_content_items_created_at ON content_items (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_content_items_slug ON content_items (slug);

-- ============================================================
-- Comment: Document the table structure
-- ============================================================
COMMENT ON TABLE content_items IS '
  Dynamic content management table for Kem Bumi Jati website.
  
  Stores both Fasiliti (facilities) and Galeri (gallery) items
  in a single table, allowing dynamic management via the admin panel.
  
  Each item can be filtered by section ("fasiliti" or "galeri")
  and sorted using sort_order.
  
  Frontend can query this table to dynamically render:
  - Facility cards in the fasiliti section
  - Gallery images in the galeri section
  
  Example query to get all active fasiliti:
  SELECT * FROM content_items WHERE section = ''fasiliti'' AND is_active = TRUE ORDER BY sort_order;
  
  Example query to get all active galeri:
  SELECT * FROM content_items WHERE section = ''galeri'' AND is_active = TRUE ORDER BY sort_order;
';

-- ============================================================
-- Example Insert Statements (Commented out)
-- ============================================================
/*
-- Fasiliti examples
INSERT INTO content_items (name, description, section, is_active, sort_order)
VALUES 
  ('Dewan Kuliah', 'Gudang kursus dan training profesional', ''fasiliti'', TRUE, 1),
  ('Asrama', 'Penginapan untuk peserta kem', ''fasiliti'', TRUE, 2),
  ('De Makan', 'Ruang makan bersama', ''fasiliti'', TRUE, 3),
  ('Bilik Urusetia', 'Bilikan untuk koordinatori dan instructors', ''fasiliti'', TRUE, 4),
  ('Surau', ' tempat ibadah', ''fasiliti'', TRUE, 5);

-- Galeri examples
INSERT INTO content_items (name, description, section, is_active, sort_order)
VALUES
  ('Aktiviti Kem', 'Foto daripada aktiviti kumpulan', ''galeri'', TRUE, 1),
  ('Program Motivasi', 'Foto daripada program motivasi', ''galeri'', TRUE, 2),
  ('Kem Pelajar', 'Foto daripada kem pelajar', ''galeri'', TRUE, 3),
  ('Team Building', 'Foto daripada aktiviti team building', ''galeri'', TRUE, 4),
  ('Kursus Korporat', 'Foto daripada kursus korporat', ''galeri'', TRUE, 5);
*/