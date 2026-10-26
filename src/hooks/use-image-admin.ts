import { useCallback, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getImageTypes, type ImageType, type Section } from "@/lib/actions/image-types";
import { getImages, deleteImage, type SiteImage } from "@/lib/actions/site-images";

export function useImageAdmin() {
  const [types, setTypes] = useState<ImageType[]>([]);
  const [images, setImages] = useState<SiteImage[]>([]);
  const [section, setSection] = useState<Section>("faciliti");
  const [selectedTypeId, setSelectedTypeId] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const loadTypes = useCallback(async () => {
    try {
      setTypes(await getImageTypes());
    } catch (e: any) {
      toast.error(e.message);
    }
  }, []);

  const loadImages = useCallback(async () => {
    try {
      setImages(await getImages());
    } catch (e: any) {
      toast.error(e.message);
    }
  }, []);

  useEffect(() => {
    loadTypes();
    loadImages();
  }, [loadTypes, loadImages]);

  const changeSection = (s: Section) => {
    setSection(s);
    setSelectedTypeId(null);
  };

  const sectionTypes = useMemo(() => types.filter((t) => t.section === section && t.is_active), [types, section]);

  const filteredImages = useMemo(() => {
    const q = search.trim().toLowerCase();
    return images.filter(
      (img) =>
        img.section === section &&
        (!selectedTypeId || img.type_id === selectedTypeId) &&
        (!q || img.filename.toLowerCase().includes(q) || img.caption?.toLowerCase().includes(q) || img.type_label.toLowerCase().includes(q))
    );
  }, [images, section, selectedTypeId, search]);

  const addImage = (img: SiteImage) => setImages((prev) => [img, ...prev]);

  const removeImage = async (img: SiteImage) => {
    try {
      await deleteImage(img);
      setImages((prev) => prev.filter((i) => i.id !== img.id));
      toast.success("Gambar dipadam");
    } catch (e: any) {
      toast.error(e.message);
    }
  };

  return {
    types,
    sectionTypes,
    filteredImages,
    section,
    changeSection,
    selectedTypeId,
    setSelectedTypeId,
    search,
    setSearch,
    loadTypes,
    addImage,
    removeImage,
  };
}
