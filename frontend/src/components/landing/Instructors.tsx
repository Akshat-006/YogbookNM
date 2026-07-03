import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { instructors } from "@/constants/instructors";

export function Instructors() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Our Experts
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight lg:text-6xl">
            Meet Our
            <br />
            Yoga Instructors
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Learn from certified yoga professionals passionate about helping you
            achieve balance, strength and mindfulness.
          </p>
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor) => (
            <div
              key={instructor.id}
              className="group overflow-hidden rounded-3xl border bg-background transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="relative aspect-[4/5]">
                <Image
                  src={instructor.image}
                  alt={instructor.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-semibold">
                  {instructor.name}
                </h3>

                <p className="mt-2 text-primary">
                  {instructor.specialization}
                </p>

                <p className="mt-3 text-sm text-muted-foreground">
                  {instructor.experience}
                </p>

                <button className="mt-6 flex items-center gap-2 font-medium text-primary">
                  View Profile

                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}