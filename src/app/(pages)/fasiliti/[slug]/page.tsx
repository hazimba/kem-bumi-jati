import type { Metadata } from "next";
import { notFound } from "next/navigation";
import PageBanner from "@/components/page-banner";
import { getFacilityType, type PublicImage } from "@/lib/quaries/faciliti";
import { Check, ImageIcon, Layers } from "lucide-react";
import ImagePreviewDialog from "@/components/image-preview-dialog";
import AnimatedItem from "@/components/animated-item";
import Image from "next/image";

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

  // Group images by caption (Profile)
  const groupedProfiles = images.reduce((acc, img) => {
    const key = img.caption?.trim() || `unnamed_${img.id}`;
    if (!acc[key]) {
      acc[key] = {
        caption: img.caption || type.label,
        description: img.description,
        items: [],
      };
    }
    acc[key].items.push(img);
    return acc;
  }, {} as Record<string, { caption: string; description: string | null; items: PublicImage[] }>);

  const profiles = Object.values(groupedProfiles);

  return (
    <main className="w-full bg-white dark:bg-neutral-950 pt-26 sm:pt-20">
      <PageBanner
        title={type.label}
        image={type.cover_url || BANNER_IMAGE}
        breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Fasiliti", href: "/fasiliti" }, { label: type.label }]}
      />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="mb-6 space-y-4 sm:mb-10 sm:space-y-5">
          <section className="max-w-7xl">
            <h1 className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 sm:text-base">
              {type.general_description.description}
            </h1>
          </section>

          {type.general_description.facilities?.length > 0 && (
            <ul className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-3">
              {type.general_description.facilities.map((facility: string, index: number) => (
                <AnimatedItem
                  key={index}
                  as="li"
                  index={index}
                  staggerDelay={0.05}
                  direction="up"
                  duration={0.5}
                  distance={20}
                  className="group flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-2.5 py-2 shadow-sm transition-all hover:border-emerald-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:border-emerald-700 sm:gap-3 sm:rounded-xl sm:px-4 sm:py-3">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 sm:h-8 sm:w-8 sm:rounded-lg">
                    <Check className="h-3 w-3 sm:h-4 sm:w-4" strokeWidth={3} />
                  </span>

                  <span className="text-xs font-medium leading-tight text-neutral-700 dark:text-neutral-200 sm:text-sm">{facility}</span>
                </AnimatedItem>
              ))}
            </ul>
          )}
        </div>

        {profiles.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-neutral-500">
            <ImageIcon className="mb-4 h-12 w-12 opacity-20" />
            <p>Tiada gambar untuk dipaparkan dalam kategori ini.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {profiles.map((profile, idx) => (
              <AnimatedItem
                key={idx}
                index={idx}
                className="flex flex-col overflow-hidden rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm transition-all hover:shadow-md">
                <div className="relative aspect-[5/3] w-full overflow-hidden">
                  <ImagePreviewDialog
                    images={profile.items}
                    title={profile.caption}
                    trigger={
                      <button className="relative h-full w-full overflow-hidden group">
                        <Image
                          src={profile.items[0]?.url}
                          alt={profile.caption}
                          fill
                          unoptimized
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                        {profile.items.length > 1 && (
                          <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-sm">
                            <Layers className="h-3.5 w-3.5" />
                            {profile.items.length} Foto
                          </div>
                        )}
                      </button>
                    }
                  />
                </div>

                <div className="flex flex-1 flex-col p-3">
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-neutral-100 uppercase">{profile.caption}</h3>
                  {profile.description && (
                    <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 line-clamp-3">
                      {profile.description}
                    </p>
                  )}

                  {profile?.items?.length > 1 && (
                    <div className="mt-auto pt-4 flex flex-wrap gap-2">
                      {profile?.items?.slice(1, 5).map((img, imgIdx) => (
                        <ImagePreviewDialog
                          key={img.id}
                          images={profile.items}
                          initialIndex={imgIdx + 1}
                          title={profile.caption}
                          trigger={
                            <button className="relative h-10 w-10 overflow-hidden rounded-lg border border-neutral-100 dark:border-neutral-800 hover:border-emerald-500 transition-colors">
                              <Image src={img.url} alt={`${profile.caption} ${imgIdx + 2}`} fill className="object-cover" unoptimized />
                            </button>
                          }
                        />
                      ))}
                      {profile.items.length > 5 && (
                        <div className="flex h-10 items-center px-2 text-[10px] font-medium text-neutral-400">
                          +{profile.items.length - 5} lagi
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </AnimatedItem>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
