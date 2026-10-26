import type { Section } from "@/lib/actions/image-types";

export const SECTIONS: { value: Section; label: string }[] = [
  { value: "faciliti", label: "Fasiliti" },
  { value: "galeri", label: "Galeri" },
];

export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
