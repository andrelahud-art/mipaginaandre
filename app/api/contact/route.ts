import { NextResponse } from "next/server";
import { Resend } from "resend";
import fs from "fs";
import path from "path";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, whatsapp, message } = body;

    // Validación básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Faltan campos requeridos" },
        { status: 400 }
      );
    }

    // Guardar lead en JSON local
    const leadsPath = path.join(process.cwd(), "data", "leads.json");
    let leads = [];

    try {
      const leadsData = fs.readFileSync(leadsPath, "utf-8");
      leads = JSON.parse(leadsData);
    } catch (error) {
      // Si el archivo no existe, se creará uno nuevo
      leads = [];
    }

    const newLead = {
      id: Date.now().toString(),
      name,
      email,
      whatsapp: whatsapp || "",
      message,
      createdAt: new Date().toISOString(),
    };

    leads.push(newLead);

    // Asegurarse de que el directorio existe
    const dataDir = path.join(process.cwd(), "data");
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    fs.writeFileSync(leadsPath, JSON.stringify(leads, null, 2));

    // Enviar email con Resend (si está configurado)
    if (resend && process.env.RESEND_API_KEY && process.env.RESEND_API_KEY !== "re_********************************") {
      try {
        await resend.emails.send({
          from: "contacto@andre-ops.com",
          to: process.env.CONTACT_TO_EMAIL || "contacto@andre-ops.com",
          subject: `Nuevo contacto de ${name}`,
          html: `
            <h2>Nuevo mensaje de contacto</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>WhatsApp:</strong> ${whatsapp || "No proporcionado"}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message}</p>
          `,
        });
      } catch (emailError) {
        console.error("Error al enviar email:", emailError);
      }
    } else {
      console.log("Resend API key no configurada. Lead guardado localmente.");
      console.log("Lead:", newLead);
    }

    return NextResponse.json({ success: true, message: "Mensaje enviado correctamente" });
  } catch (error) {
    console.error("Error en /api/contact:", error);
    return NextResponse.json(
      { error: "Error al procesar la solicitud" },
      { status: 500 }
    );
  }
}