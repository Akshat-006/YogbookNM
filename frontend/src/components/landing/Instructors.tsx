"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { instructors } from "@/constants/instructors";

// High-quality Unsplash yoga instructor portraits
const instructorImages = [
  "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?w=500&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=85&auto=format&fit=crop",
];

export function Instructors() {
  return (
    <section className="py-28 section-alt">
      <Container>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-block rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
            Our Experts
          </span>

          <h2 className="font-heading mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Meet Our
            <br />
            <span className="text-primary">Yoga Instructors</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Learn from certified yoga professionals passionate about helping
            you achieve balance, strength and mindfulness.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              whileHover={{ y: -8 }}
              className="group overflow-hidden rounded-[28px] border border-border bg-card shadow-sm transition-all hover:shadow-premium"
            >
              {/* Image */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={instructorImages[index] ?? instructor.image}
                  alt={instructor.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-108"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Specialization pill on image */}
                <div className="absolute left-4 top-4">
                  <span className="inline-flex rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
                    {instructor.specialization}
                  </span>
                </div>

                {/* Hover CTA overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <button className="flex items-center gap-2 rounded-full bg-white/95 px-5 py-2.5 text-sm font-semibold text-foreground shadow-lg backdrop-blur transition-transform group-hover:scale-105">
                    View Profile
                    <ArrowUpRight className="size-4" />
                  </button>
                </div>
              </div>

              {/* Info */}
              <div className="p-6">
                <h3 className="font-heading text-xl font-bold">{instructor.name}</h3>
                <p className="mt-1 text-sm font-medium text-primary">
                  {instructor.specialization}
                </p>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">
                    {instructor.experience}
                  </p>
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <svg
                        key={star}
                        className="size-3.5 fill-amber-400 text-amber-400"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}