import { NextRequest, NextResponse } from "next/server";

/**
 * Endpoint para subir videos a Cloudflare Stream
 *
 * IMPORTANTE: Este endpoint requiere autenticación de ADMIN
 * Descomenta las líneas de autenticación cuando tengas NextAuth configurado
 */

export async function POST(req: NextRequest) {
  try {
    // TODO: Descomentar cuando NextAuth esté configurado
    // const session = await getServerSession(authOptions);
    // if (!session?.user || session.user.role !== "ADMIN") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    // Verificar que las variables de entorno estén configuradas
    if (!process.env.CF_STREAM_ACCOUNT_ID || !process.env.CF_STREAM_API_TOKEN) {
      return NextResponse.json(
        {
          error: "Cloudflare Stream no está configurado",
          details: "Agrega CF_STREAM_ACCOUNT_ID y CF_STREAM_API_TOKEN a tu .env.local"
        },
        { status: 500 }
      );
    }

    const formData = await req.formData();
    const videoFile = formData.get("video") as File;

    if (!videoFile) {
      return NextResponse.json(
        { error: "No se proporcionó ningún video" },
        { status: 400 }
      );
    }

    // Crear FormData para Cloudflare Stream
    const cloudflareFormData = new FormData();
    cloudflareFormData.append("file", videoFile);

    // Metadata opcional
    const title = formData.get("title") as string;
    const lessonId = formData.get("lessonId") as string;

    if (title) {
      cloudflareFormData.append("meta", JSON.stringify({
        name: title,
        lessonId: lessonId || ""
      }));
    }

    // Subir a Cloudflare Stream
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_STREAM_ACCOUNT_ID}/stream`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.CF_STREAM_API_TOKEN}`,
        },
        body: cloudflareFormData,
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Cloudflare Stream error:", error);
      throw new Error("Error al subir video a Cloudflare Stream");
    }

    const data = await response.json();

    if (!data.success || !data.result) {
      throw new Error("Respuesta inválida de Cloudflare Stream");
    }

    const videoId = data.result.uid;
    const customerCode = process.env.CF_STREAM_CUSTOMER_CODE || "CUSTOMER_CODE";

    // URLs del video
    const videoUrl = `https://customer-${customerCode}.cloudflarestream.com/${videoId}/manifest/video.m3u8`;
    const thumbnailUrl = `https://customer-${customerCode}.cloudflarestream.com/${videoId}/thumbnails/thumbnail.jpg`;
    const embedUrl = `https://customer-${customerCode}.cloudflarestream.com/${videoId}/iframe`;

    return NextResponse.json({
      success: true,
      videoId,
      videoUrl,
      thumbnailUrl,
      embedUrl,
      message: "Video subido exitosamente"
    });

  } catch (error: any) {
    console.error("Upload video error:", error);
    return NextResponse.json(
      {
        error: "Error al subir video",
        details: error.message
      },
      { status: 500 }
    );
  }
}

/**
 * Ejemplo de uso desde el frontend:
 *
 * const formData = new FormData();
 * formData.append("video", fileInput.files[0]);
 * formData.append("title", "Introducción al emprendimiento");
 * formData.append("lessonId", "lesson_123");
 *
 * const response = await fetch("/api/upload-video", {
 *   method: "POST",
 *   body: formData
 * });
 *
 * const data = await response.json();
 * console.log("Video URL:", data.videoUrl);
 *
 * // Ahora actualiza la lección en la BD con data.videoUrl
 */
