import Link from "next/link";

interface CTAProps {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  variant?: "default" | "dark";
}

export default function CTA({ 
  title, 
  description, 
  buttonText, 
  buttonLink,
  variant = "default" 
}: CTAProps) {
  return (
    <section className={`section-padding ${variant === "dark" ? "bg-white/5" : ""}`}>
      <div className="container-custom max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          {title}
        </h2>
        <p className="text-xl text-accent mb-10">
          {description}
        </p>
        <Link href={buttonLink} className="btn-primary">
          {buttonText}
        </Link>
      </div>
    </section>
  );
}