import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24">
      <Container>
        <div className="rounded-[40px] border bg-primary px-8 py-16 text-center text-primary-foreground lg:px-16">
          <h2 className="text-4xl font-bold tracking-tight lg:text-6xl">
            Begin Your Yoga Journey Today
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg opacity-90">
            Discover personalized yoga programs, connect with expert instructors
            and take the first step toward a healthier lifestyle.
          </p>

          <Button
            size="lg"
            variant="secondary"
            className="mt-10 rounded-full px-8"
          >
            Get Started

            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </Container>
    </section>
  );
}