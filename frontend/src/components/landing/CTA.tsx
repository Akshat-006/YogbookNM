import { ArrowRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="py-24">
      <Container>
        <div className="rounded-3xl border bg-primary px-8 py-16 text-center text-primary-foreground lg:px-16">
          <h2 className="text-4xl font-bold lg:text-5xl">
            Ready to Begin Your
            <br />
            Yoga Journey?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-primary-foreground/80">
            Join thousands of practitioners using Yogbook to book
            classes, schedule appointments and stay consistent with
            their wellness goals.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              className="rounded-full"
            >
              Book Your First Class
              <ArrowRight className="ml-2 size-4" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="rounded-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Learn More
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}