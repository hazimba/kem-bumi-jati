import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/page-banner";
import { getFacilityType } from "@/lib/quaries/faciliti";
import { Check, ImageIcon } from "lucide-react";
import ImagePreviewDialog from "@/components/image-preview-dialog";

interface Props {
  params: Promise<{ slug: string }>;
}

const BANNER_IMAGE = "https://placehold.co/1600x500/png?text=Banner";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getFacilityType(slug);

  if (!data) {
    return {
      title: "Fasiliti Tidak Dijumpai",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = data.type.label;
  const description = data.type.description || `Galeri gambar untuk ${data.type.label}`;

  const canonical = `/fasiliti/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      images: [data.type.cover_url || BANNER_IMAGE],
    },
  };
}

export default async function FasilitiDetailPage({ params }: Props) {
  const { slug } = await params;
  const data = await getFacilityType(slug);

  if (!data) {
    notFound();
  }

  const { type, images } = data;

  return (
    <main className="w-full bg-white dark:bg-neutral-950">
      <PageBanner
        title={type.label}
        image={type.cover_url || BANNER_IMAGE}
        breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Fasiliti", href: "/fasiliti" }, { label: type.label }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6 space-y-4 sm:mb-10 sm:space-y-5">
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
            {type.general_description.description}
          </p>

          {type.general_description.facilities?.length > 0 && (
            <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
              {type.general_description.facilities.map((facility: string, index: number) => (
                <li
                  key={index}
                  className="group flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-2.5 py-2 shadow-sm transition-all hover:border-emerald-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-emerald-700 sm:gap-3 sm:rounded-xl sm:px-4 sm:py-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 sm:h-8 sm:w-8 sm:rounded-lg">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={3} />
                  </span>
                  <span className="text-xs font-medium leading-tight text-neutral-700 dark:text-neutral-200 sm:text-sm">{facility}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
            <ImageIcon className="mb-4 h-12 w-12 opacity-20" />
            <p>Tiada gambar untuk dipaparkan dalam kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((image) => (
              <div key={image.id} className="group relative rounded-xl ">
                <ImagePreviewDialog src={image.url} alt={image.caption || type.label} title={image.caption || type.label} />
                {image.caption && (
                  <div className="absolute inset-x-0 bottom-1.5 bg-gradient-to-t from-black/80 hover:rounded-xl rounded-xl to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <p className="text-sm text-white rounded-xl hover:rounded-xl">{image.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
