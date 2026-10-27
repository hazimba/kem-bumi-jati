import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

type PageBannerProps = {
  title: string;
  image: string;
  breadcrumbs?: Crumb[];
  imageAlt?: string;
};

/**
 * Reusable page banner (hero) with dark overlay, title and breadcrumb.
 * Usage:
 *   <PageBanner
 *     title="Latar Belakang"
 *     image="https://placehold.co/1600x500/png?text=Banner"
 *     breadcrumbs={[{ label: "Utama", href: "/" }, { label: "Latar Belakang" }]}
 *   />
 */
const PageBanner = ({ title, image, breadcrumbs = [], imageAlt = "" }: PageBannerProps) => {
  return (
    <section className="relative h-44 w-full overflow-hidden sm:h-60 lg:h-72">
      <Image src={image} alt={imageAlt} fill priority unoptimized className="object-cover" loading="eager" />
      {/* dark overlay, stronger on the left so the text stays readable */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/10" />

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-white sm:text-5xl">{title}</h1>

        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mt-3">
            <ol className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-white/90 sm:text-sm">
              {breadcrumbs.map((crumb, i) => {
                const isLast = i === breadcrumbs.length - 1;
                return (
                  <li key={`${crumb.label}-${i}`} className="flex items-center gap-1.5">
                    {crumb.href && !isLast ? (
                      <Link href={crumb.href} className="hover:underline">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span aria-current={isLast ? "page" : undefined}>{crumb.label}</span>
                    )}
                    {!isLast && <ChevronRight className="h-3.5 w-3.5 opacity-70" aria-hidden="true" />}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}
      </div>
    </section>
  );
};

export default PageBanner;
