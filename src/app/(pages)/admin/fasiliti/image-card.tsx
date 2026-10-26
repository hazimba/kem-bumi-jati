import Image from "next/image";
import { ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { SiteImage } from "@/lib/actions/site-images";

interface Props {
  image: SiteImage;
  onDelete: (image: SiteImage) => void;
}

export function ImageCard({ image, onDelete }: Props) {
  return (
    <div className="group relative bg-neutral-100 dark:bg-neutral-900 rounded-xl overflow-hidden border border-neutral-200 dark:border-neutral-800">
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image src={image.url} alt={image.filename} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-4">
          <Button variant="ghost" size="icon" className="text-white" title="Lihat" onClick={() => window.open(image.url, "_blank")}>
            <ImageIcon className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-red-600 hover:bg-red-50/20" title="Padam" onClick={() => onDelete(image)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="p-3">
        <p className="font-medium text-sm text-neutral-800 dark:text-neutral-100 truncate">{image.caption || "Tanpa keterangan"}</p>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          {image.type_label} • {image.image_date}
        </p>
      </div>
    </div>
  );
}
