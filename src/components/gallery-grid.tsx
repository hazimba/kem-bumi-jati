import { getGaleri } from "@/lib/quaries/galeri";
import GalleryTabs from "./galeri-tab";

const GalleryGrid = async () => {
  const { types, images } = await getGaleri();
  // console.log("GalleryGrid: types", types);
  // console.log("GalleryGrid: images", images);
  return <GalleryTabs types={types} images={images} />;
};

export default GalleryGrid;
