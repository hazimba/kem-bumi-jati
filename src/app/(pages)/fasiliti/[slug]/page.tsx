import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/page-banner";
import { getFacilityType } from "@/lib/quaries/faciliti";
import { ImageIcon } from "lucide-react";
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
      title: "Fasiliti Tidak Dijumpai | Kem Bumi Jati",
    };
  }

  return {
    title: `${data.type.label} | Kem Bumi Jati`,
    description: data.type.description || `Galeri gambar untuk ${data.type.label}`,
    openGraph: {
      title: `${data.type.label} | Kem Bumi Jati`,
      description: data.type.description || `Galeri gambar untuk ${data.type.label}`,
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
        {type.description && (
          <p className="mb-10 max-w-3xl text-base leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-lg">{type.description}</p>
        )}

        {images.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
            <ImageIcon className="mb-4 h-12 w-12 opacity-20" />
            <p>Tiada gambar untuk dipaparkan dalam kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {images.map((image) => (
              <div key={image.id} className="group relative rounded-xl ">
                {/* <Image
                  src={image.url}
                  alt={image.caption || type.label}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                /> */}
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
