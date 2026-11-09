export type R2UploadResult = {
  url: string;
  path: string;
  filename: string;
};

async function compressAndConvertToWebp(file: File, maxSizeBytes = 1024 * 1024): Promise<File> {
  const MAX_DIMENSION = 1920;
  const bitmap = await createImageBitmap(file);

  // Scale down so the longest side is at most MAX_DIMENSION
  const scale = Math.min(1, MAX_DIMENSION / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);

  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Gagal memproses imej");
  ctx.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close();

  const toBlob = (quality: number) => new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", quality));

  // Lower the quality until the file is under the size limit
  let quality = 0.82;
  let blob = await toBlob(quality);
  while (blob && blob.size > maxSizeBytes && quality > 0.3) {
    quality -= 0.1;
    blob = await toBlob(quality);
  }

  if (!blob) throw new Error("Gagal menukar imej ke format WebP");

  const baseName = file.name
    .replace(/\.[^.]+$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "_");
  return new File([blob], `${baseName}.webp`, { type: "image/webp", lastModified: Date.now() });
}

export async function uploadToR2(file: File, folder: "images" | "covers"): Promise<R2UploadResult> {
  // Compress and convert to webp before uploading
  const processedFile = await compressAndConvertToWebp(file);

  const formData = new FormData();
  formData.append("file", processedFile);
  formData.append("folder", folder);

  const response = await fetch("/api/r2-images", {
    method: "POST",
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error || "R2 upload failed");
  }

  return result as R2UploadResult;
}

export async function deleteFromR2(path: string): Promise<void> {
  const response = await fetch("/api/r2-images", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ path }),
  });

  if (!response.ok) {
    const result = await response.json();
    throw new Error(result.error || "R2 delete failed");
  }
}
