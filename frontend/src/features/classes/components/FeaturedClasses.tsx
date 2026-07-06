"use client";

import { useClasses } from "../hooks/useClasses";
import { ClassCard } from "./ClassCard";
import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FeaturedClasses() {
  const { data, error, isLoading, isError } = useClasses();

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
          <p>
            Unable to load classes.
            {error ? ` ${String(error)}` : ""}
          </p>
        </Container>
      </section>
    );
  }

  const featured = data?.slice(0, 3);

  if (!featured?.length) {
  return (
    <section className="py-24">
      <Container>
        <div className="text-center">
          <h2 className="text-4xl font-bold">
            Featured Yoga Classes
          </h2>

          <p className="mt-4 text-muted-foreground">
            No classes available at the moment.
          </p>
        </div>
      </Container>
    </section>
  );}

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

        <div className="mt-12 flex justify-center">
          <Button asChild size="lg">
            <Link href="/classes">
              View All Classes
            </Link>
          </Button>
        </div>

      </Container>
    </section>
  );
}