"use client";

import { useClasses } from "../hooks/useClasses";
import { ClassCard } from "./ClassCard";
import { Container } from "@/components/layout/Container";

export function FeaturedClasses() {
  const { data, isLoading, isError } = useClasses();

  if (isLoading) {
    return (
      <section className="py-24">
        <Container>
          <p>Loading classes...</p>
        </Container>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-24">
        <Container>
          <p>Unable to load classes.</p>
        </Container>
      </section>
    );
  }

  const featured = data?.slice(0, 3);

  return (
    <section id="classes" className="py-24">
      <Container>
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold">
            Featured Yoga Classes
          </h2>

          <p className="mt-4 text-muted-foreground">
            Join expert-led yoga sessions designed for every level.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featured?.map((item) => (
            <ClassCard
              key={item._id}
              yogaClass={item}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}