"use client";

import { useClasses } from "../hooks/useClasses";
import { getDisplayClasses } from "../utils/visibleClasses";
import { ClassCard } from "./ClassCard";
import { Container } from "@/components/layout/Container";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export function FeaturedClasses() {
  const { data, error, isLoading, isError } = useClasses();

  if (isLoading) {
    return (
      <section className="py-28">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-[480px] animate-pulse rounded-[24px] bg-muted/60"
              />
            ))}
          </div>
        </Container>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="py-28">
        <Container>
          <p className="text-center text-muted-foreground">
            Unable to load classes.
            {error ? ` ${String(error)}` : ""}
          </p>
        </Container>
      </section>
    );
  }

  const visibleClasses = getDisplayClasses(data ?? []);
  const featured = visibleClasses.slice(0, 3);

  if (!featured.length) {
    return (
      <section className="py-28">
        <Container>
          <div className="text-center">
            <h2 className="font-heading text-4xl font-bold">Featured Yoga Classes</h2>
            <p className="mt-4 text-muted-foreground">
              No classes available at the moment.
            </p>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section id="classes" className="py-28">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14 text-center"
        >
          <span className="inline-block rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Featured Classes
          </span>

          <h2 className="font-heading mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Transform Through Practice
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Join expert-led yoga sessions designed for every level — from
            calm beginners to seasoned practitioners.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {featured?.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
            >
              <ClassCard yogaClass={item} />
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-14 flex justify-center"
        >
          <Button
            asChild
            size="lg"
            className="h-13 rounded-full bg-primary px-10 text-base font-semibold text-primary-foreground shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <Link href="/classes">
              View All Classes
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </motion.div>
      </Container>
    </section>
  );
}