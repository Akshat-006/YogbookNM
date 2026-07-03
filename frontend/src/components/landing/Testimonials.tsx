import Image from "next/image";
import { Star } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { testimonials } from "@/constants/testimonials";

export function Testimonials() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Testimonials
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight lg:text-6xl">
            Loved by Our
            <br />
            Yoga Community
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Hear what our community has to say about their Yogbook experience.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border bg-background/70 p-8 backdrop-blur transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="mb-6 flex">
                {Array.from({ length: item.rating }).map((_, index) => (
                  <Star
                    key={index}
                    className="size-5 fill-primary text-primary"
                  />
                ))}
              </div>

              <p className="leading-8 text-muted-foreground">
                "{item.review}"
              </p>

              <div className="mt-8 flex items-center gap-4">
                <div className="relative h-14 w-14 overflow-hidden rounded-full">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h4 className="font-semibold">{item.name}</h4>
                  <p className="text-sm text-muted-foreground">
                    {item.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}