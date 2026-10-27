import { getGaleriTypes, getGaleriImages } from "@/lib/quaries/galeri";
import GalleryTabs from "./galeri-tab";

const GalleryGrid = async () => {
  // Fetch types and only the first page of images concurrently
  const [types, initialData] = await Promise.all([getGaleriTypes(), getGaleriImages({ page: 1 })]);

  console.log("initialData", initialData);
  return <GalleryTabs types={types} initialImages={initialData.images} initialHasMore={initialData.hasMore} />;
};

export default GalleryGrid;
