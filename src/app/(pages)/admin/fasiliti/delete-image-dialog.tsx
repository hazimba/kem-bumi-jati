import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { SiteImage } from "@/lib/actions/site-images";

interface Props {
  image: SiteImage | null;
  onCancel: () => void;
  onConfirm: () => void;
}

export function DeleteImageDialog({ image, onCancel, onConfirm }: Props) {
  return (
    <Dialog open={!!image} onOpenChange={(open) => !open && onCancel()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Padam Gambar</DialogTitle>
          <DialogDescription>
            Adakah anda pasti mahu memadam <strong>{image?.filename}</strong>?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Batal
          </Button>
          <Button onClick={onConfirm} className="bg-red-600 hover:bg-red-500 text-white">
            Padam
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
