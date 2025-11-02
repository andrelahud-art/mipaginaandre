import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getProfileData() {
  const profilePath = path.join(process.cwd(), "data/profile.json");
  try {
    const data = fs.readFileSync(profilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // Return default profile if file doesn't exist
    return {
      name: "André Lahud",
      title: "Estrategia, IA y Creación de Valor",
      bio: "Especialista en transformación digital con 10+ años ayudando empresas a implementar IA y estrategias de datos para crear ventajas competitivas sostenibles.",
      email: "contacto@andrelahud.com",
      linkedin: "https://linkedin.com/in/andrelahud",
      location: "Ciudad de México, México",
      avatar: "/hero-linkedin.jpg",
      heroImage: "/hero-linkedin.jpg",
      skills: ["Inteligencia Artificial", "Estrategia Digital", "Análisis de Datos", "Automatización", "Transformación Digital"],
      experience: "10+ años en consultoría estratégica",
      education: "MBA en Estrategia Digital"
    };
  }
}

function saveProfileData(data: any) {
  const profilePath = path.join(process.cwd(), "data/profile.json");
  fs.writeFileSync(profilePath, JSON.stringify(data, null, 2));
}

export async function GET(request: NextRequest) {
  try {
    const profile = getProfileData();
    return NextResponse.json({
      success: true,
      profile
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const profileData = await request.json();
    
    // Basic validation
    if (!profileData.name || !profileData.email) {
      return NextResponse.json(
        { error: "Name and email are required" },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profileData.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    // Save profile data
    saveProfileData(profileData);

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully"
    });

  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}