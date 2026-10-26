export async function resizeImageToLimit(file: File, maxBytes: number, maxDimension = 2560): Promise<File> {
  if (file.size <= maxBytes) return file; // already small enough, untouched

  // "from-image" respects EXIF rotation so phone photos don't come out sideways
  const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });

  let scale = Math.min(1, maxDimension / Math.max(bitmap.width, bitmap.height));
  let quality = 0.9;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas tidak disokong");

  for (let i = 0; i < 12; i++) {
    canvas.width = Math.max(1, Math.round(bitmap.width * scale));
    canvas.height = Math.max(1, Math.round(bitmap.height * scale));

    // white background so transparent PNGs don't turn black as JPEG
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);

    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", quality));

    if (blob && blob.size <= maxBytes) {
      bitmap.close();
      const name = file.name.replace(/\.[^.]+$/, "") + ".jpg";
      return new File([blob], name, { type: "image/jpeg" });
    }

    // lower quality first, then shrink dimensions
    if (quality > 0.6) quality -= 0.1;
    else scale *= 0.85;
  }

  bitmap.close();
  throw new Error("Tidak dapat mengecilkan gambar");
}
