"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";

import { Container } from "@/components/layout/Container";
import { instructors as staticInstructors } from "@/constants/instructors";
import { getCMSContentByKey } from "@/features/admin/services/cms.service";

const EXPERT_KEYS = ["expert_1", "expert_2", "expert_3"] as const;

// Curated fallback images
const fallbackImages = [
  "https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=500&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1591228127791-8e2eaef098d3?w=500&q=85&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=85&auto=format&fit=crop",
];

function useExpertsCMS() {
  const queries = EXPERT_KEYS.map((key) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ["cms-content", key],
      queryFn: () => getCMSContentByKey(key),
      retry: false,
      staleTime: 1000 * 60 * 5,
    })
  );

  const isLoading = queries.some((q) => q.isLoading);
  const items = queries.map((q) => q.data ?? null);
  const hasCMSData = items.some((item) => item !== null);

  return { isLoading, items, hasCMSData };
}

export function Instructors() {
  const { isLoading, items, hasCMSData } = useExpertsCMS();

  // Build display list: CMS entries when available, static fallback otherwise
  const displayExperts = hasCMSData
    ? items.map((item, index) => {
        const fallback = staticInstructors[index];
        if (!item) {
          return fallback
            ? {
                name: fallback.name,
                specialization: fallback.specialization,
                experience: fallback.experience,
                image: fallbackImages[index] ?? fallback.image,
              }
            : null;
        }
        return {
          name: item.title ?? fallback?.name ?? "Instructor",
          specialization: item.subtitle ?? fallback?.specialization ?? "Yoga",
          experience: item.description ?? fallback?.experience ?? "",
          image: item.image ?? fallbackImages[index] ?? "",
        };
      }).filter(Boolean)
    : staticInstructors.map((instructor, index) => ({
        name: instructor.name,
        specialization: instructor.specialization,
        experience: instructor.experience,
        image: fallbackImages[index] ?? instructor.image,
      }));

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
        {isLoading ? (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="h-96 animate-pulse rounded-[28px] bg-muted/60"
              />
            ))}
          </div>
        ) : (
          <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayExperts.map((expert, index) => {
              if (!expert) return null;
              return (
                <motion.div
                  key={expert.name + index}
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
                      src={expert.image}
                      alt={expert.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-108"
                    />
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                    {/* Specialization pill on image */}
                    <div className="absolute left-4 top-4">
                      <span className="inline-flex rounded-full bg-primary/90 px-3 py-1 text-xs font-semibold text-primary-foreground backdrop-blur-sm">
                        {expert.specialization}
                      </span>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6">
                    <h3 className="font-heading text-xl font-bold">{expert.name}</h3>
                    <p className="mt-1 text-sm font-medium text-primary">
                      {expert.specialization}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <p className="text-sm text-muted-foreground">
                        {expert.experience}
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
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}