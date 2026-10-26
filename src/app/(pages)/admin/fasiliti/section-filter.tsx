import { Button } from "@/components/ui/button";
import { SECTIONS } from "@/lib/image-sections";
import type { ImageType, Section } from "@/lib/actions/image-types";

interface Props {
  section: Section;
  onSectionChange: (s: Section) => void;
  types: ImageType[]; // already filtered to the active section
  selectedTypeId: string | null;
  onTypeChange: (id: string | null) => void;
}

export function SectionFilter({ section, onSectionChange, types, selectedTypeId, onTypeChange }: Props) {
  return (
    <>
      <div className="flex gap-2 mb-4">
        {SECTIONS.map((s) => (
          <Button key={s.value} variant={section === s.value ? "outline" : "ghost"} onClick={() => onSectionChange(s.value)}>
            {s.label}
          </Button>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        <Button className="px-3 py-1.5 text-sm" variant={selectedTypeId === null ? "outline" : "ghost"} onClick={() => onTypeChange(null)}>
          Semua Jenis
        </Button>
        {types.map((t) => (
          <Button
            key={t.id}
            className="px-3 py-1.5 text-sm"
            style={{
              backgroundColor: selectedTypeId === t.id ? "var(--brand-dark)" : undefined,
              color: selectedTypeId === t.id ? "white" : undefined,
            }}
            onClick={() => onTypeChange(t.id)}>
            {t.label}
          </Button>
        ))}
      </div>
    </>
  );
}
