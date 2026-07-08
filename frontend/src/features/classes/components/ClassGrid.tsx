"use client";

import { Container } from "@/components/layout/Container";
import { useClasses } from "../hooks/useClasses";
import { getDisplayClasses } from "../utils/visibleClasses";
import { ClassCard } from "./ClassCard";
import { Flower2 } from "lucide-react";

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
      <Container className="py-24 text-center">
        <div className="mx-auto max-w-md rounded-2xl border border-destructive/20 bg-destructive/5 p-8 text-sm text-destructive">
          <p className="font-semibold">Unable to load classes.</p>
          <p className="mt-1 text-xs opacity-80">{error ? String(error) : "Please check your network connection and try again."}</p>
        </div>
      </Container>
    );
  }

  const visibleClasses = getDisplayClasses(data ?? []);

  if (!visibleClasses.length) {
    return (
      <Container className="py-24 text-center">
        <div className="mx-auto max-w-md rounded-3xl border border-dashed border-border p-12">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Flower2 className="size-6" />
          </div>
          <h2 className="font-heading mt-6 text-xl font-bold">No Classes Available</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We are currently scheduling new sessions. Please check back soon or book a personal consultation.
          </p>
        </div>
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