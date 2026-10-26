import { getGaleri } from "@/lib/quaries/galeri";
import GalleryTabs from "./galeri-tab";

const GalleryGrid = async () => {
  const { types, images } = await getGaleri();
  return <GalleryTabs types={types} images={images} />;
};

export default GalleryGrid;
