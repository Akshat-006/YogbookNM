import { Container } from "@/components/layout/Container";
import { HeroContent } from "./HeroContent";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-28 lg:pt-36">
      {/* Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-[-120px] top-24 h-96 w-96 rounded-full bg-primary/10 blur-[130px]" />

        <div className="absolute right-[-120px] top-0 h-[420px] w-[420px] rounded-full bg-primary/10 blur-[150px]" />

        <div className="absolute bottom-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[170px]" />
      </div>

      <Container>
        <div className="grid items-center gap-20 lg:grid-cols-2">
          <HeroContent />
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}