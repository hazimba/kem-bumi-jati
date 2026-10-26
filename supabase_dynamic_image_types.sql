-- ============================================================
-- Dynamic Image Types Management for Kem Bumi Jati
-- Purpose: Replace hardcoded FASILITI_TYPES/GALERI_TYPES with database-driven values
-- Admin can manage types via the admin panel
-- ============================================================

-- Table: public.image_types
-- Stores dynamic type definitions for fasiliti and galeri
CREATE TABLE IF NOT EXISTS public.image_types (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section     TEXT NOT NULL CHECK (section IN ('faciliti', 'galeri')),
  slug        TEXT NOT NULL,               -- e.g. 'dewan-kuliah', 'aktiviti'
  label       TEXT NOT NULL,               -- Display label, e.g. 'Dewan Kuliah', 'Aktiviti'
  sort_order  INTEGER NOT NULL DEFAULT 0,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ DEFAULT now(),
  
  CONSTRAINT unique_section_slug UNIQUE (section, slug)
);

-- Enable RLS
ALTER TABLE public.image_types ENABLE ROW LEVEL SECURITY;

-- Policies: public can read, authenticated can manage
CREATE POLICY "public can read image_types" 
  ON public.image_types FOR SELECT TO public USING (true);

CREATE POLICY "admin can manage image_types" 
  ON public.image_types FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION update_image_types_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_image_types_updated_at_trigger
  BEFORE UPDATE ON public.image_types
  FOR EACH ROW
  EXECUTE FUNCTION update_image_types_updated_at();

-- ============================================================
-- Table: public.site_images  
-- Stores images with references to dynamic types
-- ============================================================
CREATE TABLE IF NOT EXISTS public.site_images (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  type_id       UUID NOT NULL REFERENCES public.image_types(id) ON DELETE CASCADE,
  url           TEXT NOT NULL,
  filename      TEXT NOT NULL,
  storage_path  TEXT NOT NULL,             -- path inside the storage bucket
  caption       TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  image_date    DATE NOT NULL DEFAULT current_date,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;

-- Policies: public can read, authenticated can manage
CREATE POLICY "public can read site_images" 
  ON public.site_images FOR SELECT TO public USING (true);

CREATE POLICY "admin can manage site_images" 
  ON public.site_images FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_site_images_type_id ON public.site_images(type_id);
CREATE INDEX IF NOT EXISTS idx_site_images_sort_order ON public.site_images(section, sort_order);

-- View: combined view for easy querying
CREATE OR REPLACE VIEW public.site_images_view AS
SELECT 
  i.id,
  i.type_id,
  i.url,
  i.filename,
  i.caption,
  i.sort_order,
  i.image_date,
  i.created_at,
  t.section,
  t.slug,
  t.label as type_label,
  t.is_active as type_active
FROM public.site_images i
JOIN public.image_types t ON t.id = i.type_id;

-- ============================================================
-- Seed data (optional - uncomment to initialize)
-- ============================================================
/*
INSERT INTO public.image_types (section, slug, label, sort_order) VALUES
  ('faciliti', 'dewan-kuliah',   'Dewan Kuliah',   1),
  ('faciliti', 'asrama',        'Asrama',         2),
  ('faciliti', 'dewan-makan',    'Dewan Makan',    3),
  ('faciliti', 'bilik-urusetia', 'Bilik Urusetia', 4),
  ('faciliti', 'surau',          'Surau',          5),
  ('galeri',   'aktiviti',        'Aktiviti',       1),
  ('galeri',   'program',         'Program',        2),
  ('galeri',   'kawasan',         'Kawasan',        3);
*/