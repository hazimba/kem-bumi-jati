import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";
import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2, R2_BUCKET, R2_PUBLIC_URL, IMAGE_FOLDER } from "@/lib/r2";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const MIME_EXTENSIONS: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "image/avif": "avif",
};

// async function isAdmin() {
//   const cookieStore = await cookies();

//   const supabase = createServerClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL! || "https://mlapxffieyehdpvuzsyw.supabase.co",
//     process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! || "sb_publishable_ZOmLKMqnmBsr9RgREljNkw_D9-H3i0x",
//     {
//       cookies: {
//         getAll() {
//           return cookieStore.getAll();
//         },
//         setAll() {
//           // This endpoint only reads the existing session.
//         },
//       },
//     }
//   );

//   const {
//     data: { user },
//     error,
//   } = await supabase.auth.getUser();

//   if (error || !user) return false;

//   const adminIds = (process.env.R2_ADMIN_USER_IDS ?? "")
//     .split(",")
//     .map((id) => id.trim())
//     .filter(Boolean);

//   return adminIds.includes(user.id);
// }

function isValidPath(path: string) {
  return /^(?:covers\/)?[a-zA-Z0-9_-]+\.(?:jpg|jpeg|png|webp|gif|avif)$/.test(path);
}

export async function POST(request: NextRequest) {
  try {
    // if (!(await isAdmin())) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    const formData = await request.formData();
    const file = formData.get("file");
    const folder = formData.get("folder");

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "Invalid file" }, { status: 400 });
    }

    if (folder !== "images" && folder !== "covers") {
      return NextResponse.json({ error: "Invalid folder" }, { status: 400 });
    }

    const extension = MIME_EXTENSIONS[file.type];

    if (!extension || file.size === 0 || file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: "Invalid image format or file size" }, { status: 400 });
    }

    const filename = `${crypto.randomUUID()}.${extension}`;
    const path = folder === "covers" ? `covers/${filename}` : filename;

    const key = `${IMAGE_FOLDER}/${path}`;

    await r2.send(
      new PutObjectCommand({
        Bucket: R2_BUCKET,
        Key: key,
        Body: new Uint8Array(await file.arrayBuffer()),
        ContentType: file.type,
        CacheControl: "public, max-age=31536000, immutable",
      })
    );

    console.log("R2_PUBLIC_URL:", R2_PUBLIC_URL);

    return NextResponse.json({
      url: `${R2_PUBLIC_URL}/${key}`,
      path,
      filename,
    });
  } catch (error) {
    console.error("R2 upload error:", error);

    return NextResponse.json({ error: "Gagal muat naik imej" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // if (!(await isAdmin())) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    const body = await request.json();
    const path = body?.path;

    if (typeof path !== "string" || !isValidPath(path)) {
      return NextResponse.json({ error: "Invalid image path" }, { status: 400 });
    }

    await r2.send(
      new DeleteObjectCommand({
        Bucket: R2_BUCKET,
        Key: `${IMAGE_FOLDER}/${path}`,
      })
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("R2 delete error:", error);

    return NextResponse.json({ error: "Gagal padam imej" }, { status: 500 });
  }
}
