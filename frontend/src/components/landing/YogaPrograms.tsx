"use client";

import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/layout/Container";
import { programs } from "@/constants/programs";

export function YogaPrograms() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Explore
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight lg:text-6xl">
            Yoga Programs
            <br />
            for Every Lifestyle
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Whether you're just starting your yoga journey or deepening your
            existing practice, discover programs designed for every stage.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {programs.map((program) => {
            const Icon = program.icon;

            return (
              <div
                key={program.id}
                className="group rounded-3xl border bg-background p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="size-7 text-primary" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {program.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {program.description}
                </p>

                <div className="mt-8 flex items-center justify-between text-sm">

                  <span>{program.duration}</span>

                  <span>{program.level}</span>

                </div>

                <div className="mt-8 flex items-center gap-2 font-medium text-primary">

                  Explore Program

                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />

                </div>

              </div>
            );
          })}

        </div>
      </Container>
    </section>
  );
}