"use client";

import { Container } from "@/components/layout/Container";
import { useClasses } from "../hooks/useClasses";
import { getDisplayClasses } from "../utils/visibleClasses";
import { ClassCard } from "./ClassCard";

export function ClassGrid() {
  const { data, error, isLoading, isError } = useClasses();

  if (isLoading) {
    return (
      <Container>
        <p>Loading classes...</p>
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
        <h1 className="text-4xl font-bold">
          Explore Yoga Classes
        </h1>

        <p className="mt-3 text-muted-foreground">
          Choose the class that fits your wellness journey.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {visibleClasses.map((item) => (
          <ClassCard
            key={item._id}
            yogaClass={item}
          />
        ))}
      </div>
    </Container>
  );
}