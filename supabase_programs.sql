-- ============================================================
-- Programs Management Table for Kem Bumi Jati
-- Purpose: Dynamic CRUD for programs displayed in WhyChooseSection
-- ============================================================

CREATE TABLE IF NOT EXISTS public.programs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  description  TEXT NOT NULL DEFAULT '',
  image_url    TEXT NOT NULL,
  storage_path TEXT,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  is_active    BOOLEAN NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.programs ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "public can read programs" 
  ON public.programs FOR SELECT TO public USING (true);

CREATE POLICY "admin can manage programs" 
  ON public.programs FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Trigger for updated_at
CREATE OR REPLACE FUNCTION update_programs_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_programs_updated_at_trigger
  BEFORE UPDATE ON public.programs
  FOR EACH ROW
  EXECUTE FUNCTION update_programs_updated_at();

-- Seed initial programs data
INSERT INTO public.programs (title, description, image_url, sort_order) VALUES
  ('Trained Nepalese Guard', 'Pengawal keselamatan berpengalaman dan terlatih untuk memastikan keselamatan peserta.', 'https://images.kembumijati.com/kem_bumi_jati_header_background_img/1000211396.jpg', 1),
  ('Team Building', 'Kursus, latihan organisasi dan aktiviti kumpulan.', 'https://placehold.co/1600x500/png?text=Team+Building', 2),
  ('Motivasi & Kepimpinan', 'Program pembangunan diri dan kepimpinan.', 'https://images.kembumijati.com/kem_bumi_jati_header_background_img/IMG_20260803_142041.jpg', 3),
  ('Kem Kepimpinan & Jati Diri', 'Program pembangunan diri dan kepimpinan untuk remaja dan belia.', 'https://images.kembumijati.com/kem_bumi_jati_header_background_img/1000144361.jpg', 4),
  ('Kem Smart Solat', 'Program pembangunan diri dan kepimpinan untuk remaja dan belia.', 'https://placehold.co/1600x500/png?text=Kem+Smart+Solat', 5),
  ('Kem Akademik Skor SPM', 'Program pembangunan diri dan kepimpinan untuk remaja dan belia.', 'https://placehold.co/1600x500/png?text=Kem+Akademik+Skor+SPM', 6),
  ('Kem Perkhemahan', 'Program akademik untuk pelajar SPM.', 'https://placehold.co/1600x500/png?text=Kem+Perkhemahan', 7),
  ('Program Ai & Sahsiah Diri', 'Program akademik untuk pelajar SPM.', 'https://placehold.co/1600x500/png?text=Program+Ai+&+Sahsiah+Diri', 8)
ON CONFLICT DO NOTHING;
