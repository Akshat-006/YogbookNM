"use client";

import { Container } from "@/components/layout/Container";
import { useClasses } from "../hooks/useClasses";
import { getDisplayClasses } from "../utils/visibleClasses";
import { ClassCard } from "./ClassCard";

export function ClassGrid() {
  const { data, error, isLoading, isError } = useClasses();

  if (isLoading) {
    return (
      <Container className="py-24">
        <div className="mb-12">
          <div className="h-10 w-64 animate-pulse rounded-2xl bg-muted/60" />
          <div className="mt-3 h-5 w-80 animate-pulse rounded-xl bg-muted/60" />
        </div>
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-[480px] animate-pulse rounded-[24px] bg-muted/60" />
          ))}
        </div>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <p>
          Unable to load classes.
          {error ? ` ${String(error)}` : ""}
        </p>
      </Container>
    );
  }

  const visibleClasses = getDisplayClasses(data ?? []);

  if (!visibleClasses.length) {
    return (
      <Container>
        <p>No classes available.</p>
      </Container>
    );
  }

  return (
    <Container>
      <div className="mb-12">
        <span className="inline-block rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          All Classes
        </span>
        <h1 className="font-heading mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
          Explore Yoga Classes
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Choose the class that fits your wellness journey.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {visibleClasses.map((item, i) => (
          <ClassCard
            key={item._id}
            yogaClass={item}
            index={i}
          />
        ))}
      </div>
    </Container>
  );
}