import Image from "next/image";

export default function LogoStrip() {
  const logos = [
    { src: "/logos/mercado-libre.svg", alt: "Mercado Libre", name: "Mercado Libre" },
    { src: "/logos/meta.svg", alt: "Meta", name: "Meta" },
    { src: "/logos/tec.svg", alt: "Tecnológico de Monterrey", name: "Tec de Monterrey" },
    { src: "/logos/tpf.svg", alt: "Todo Para Tu Familia", name: "Todo Para Tu Familia" },
  ];

  return (
    <div className="container-custom">
      <p className="text-center text-accent mb-8">Experiencia con</p>
      <div className="flex flex-wrap items-center justify-center gap-12 md:gap-16">
        {logos.map((logo) => (
          <div key={logo.name} className="relative h-12 w-32 opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0">
            <Image
              src={logo.src}
              alt={logo.alt}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}