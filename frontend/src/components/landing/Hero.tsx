import { Container } from "@/components/layout/Container";
import { HeroContent } from "./HeroContent";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-28 lg:py-36 xl:py-44">
      {/* Warm gradient base */}
      <div className="absolute inset-0 -z-10 hero-gradient" />

      {/* Decorative orbs */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-10%] top-[-5%] h-[600px] w-[600px] rounded-full bg-primary/8 blur-[120px]" />
        <div className="absolute right-[-15%] top-[10%] h-[500px] w-[500px] rounded-full bg-accent/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[35%] h-[400px] w-[400px] rounded-full bg-secondary/15 blur-[130px]" />
      </div>

      {/* Dotted texture overlay */}
      <div
        className="absolute inset-0 -z-10 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 xl:gap-24">
          <HeroContent />
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}