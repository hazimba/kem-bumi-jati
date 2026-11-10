import type { MetadataRoute } from "next";

const baseUrl = "https://kembumijati.com";

const facilitySlugs = ["asrama", "dewan-makan", "bilik-urusetia", "padang-kawad", "surau", "obstacle", "kolam-renang", "dewan-kuliah"];

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/fasiliti`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeri`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/lokasi-kami`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const facilityPages: MetadataRoute.Sitemap = facilitySlugs.map((slug) => ({
    url: `${baseUrl}/fasiliti/${slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...facilityPages];
}
