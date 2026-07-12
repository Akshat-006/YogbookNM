"use client";

import { motion, type Variants } from "framer-motion";
import { Container } from "@/components/layout/Container";
import { useQuery } from "@tanstack/react-query";
import { getCMSContentByKey } from "@/features/admin/services/cms.service";
import { getIcon } from "@/lib/iconMap";
import {
  Brain,
  Heart,
  Moon,
  Activity,
  Sparkles,
  Leaf,
} from "lucide-react";

const staticBenefits = [
  {
    title: "Mental Clarity",
    description: "Improve focus, mindfulness and inner peace through daily yoga.",
    icon: Brain,
  },
  {
    title: "Healthy Heart",
    description: "Support cardiovascular health with balanced movement and breathing.",
    icon: Heart,
  },
  {
    title: "Better Sleep",
    description: "Relax your body and mind for deeper, restorative sleep.",
    icon: Moon,
  },
  {
    title: "Body Flexibility",
    description: "Increase mobility, posture and overall body strength.",
    icon: Activity,
  },
  {
    title: "Positive Energy",
    description: "Feel more energized and productive throughout your day.",
    icon: Sparkles,
  },
  {
    title: "Natural Wellness",
    description: "Build healthy habits that support lifelong wellness.",
    icon: Leaf,
  },
];

const BENEFIT_KEYS = [
  "benefit_1",
  "benefit_2",
  "benefit_3",
  "benefit_4",
  "benefit_5",
  "benefit_6",
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

/**
 * Fetches all benefit CMS entries in parallel.
 * Returns an array of CMS items (some may be null if not created yet).
 */
function useBenefitsCMS() {
  const queries = BENEFIT_KEYS.map((key) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ["cms-content", key],
      queryFn: () => getCMSContentByKey(key),
      retry: false,
      staleTime: 1000 * 60 * 5, // cache for 5 minutes
    })
  );

  const isLoading = queries.some((q) => q.isLoading);
  const items = queries.map((q) => q.data ?? null);
  // CMS is "active" if at least one entry exists in the DB
  const hasCMSData = items.some((item) => item !== null);

  return { isLoading, items, hasCMSData };
}

export function Benefits() {
  const { isLoading, items, hasCMSData } = useBenefitsCMS();

  // Determine what to render: CMS data (if available) or static fallback
  const displayItems = hasCMSData
    ? items.map((item, index) => {
        if (!item) {
          // Use static fallback for any empty slot
          const fallback = staticBenefits[index];
          if (!fallback) return null;
          return {
            title: fallback.title,
            description: fallback.description,
            Icon: fallback.icon,
          };
        }
        return {
          title: item.title ?? `Benefit ${index + 1}`,
          description: item.description ?? "",
          Icon: getIcon(item.icon),
        };
      }).filter(Boolean)
    : staticBenefits.map((b) => ({
        title: b.title,
        description: b.description,
        Icon: b.icon,
      }));

  return (
    <section className="relative py-28 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-background via-primary/4 to-background" />

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
            Benefits
          </span>

          <h2 className="font-heading mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            Discover the Benefits
            <br />
            <span className="text-primary">of Yoga</span>
          </h2>

          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Yoga is more than exercise — it&apos;s a path to a healthier body,
            calmer mind and balanced lifestyle.
          </p>
        </motion.div>

        {/* Cards grid */}
        {isLoading ? (
          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="h-52 animate-pulse rounded-[28px] bg-muted/60"
              />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-3"
          >
            {displayItems.map((benefit) => {
              if (!benefit) return null;
              const Icon = benefit.Icon;
              return (
                <motion.div
                  key={benefit.title}
                  variants={cardVariants}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="group rounded-[28px] border border-border bg-card p-8 shadow-sm transition-shadow hover:shadow-premium"
                >
                  {/* Icon */}
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/15 to-primary/5 ring-1 ring-primary/10 transition-all group-hover:from-primary/25 group-hover:to-primary/10">
                    <Icon className="size-6 text-primary" />
                  </div>

                  <h3 className="font-heading mt-7 text-xl font-bold">
                    {benefit.title}
                  </h3>

                  <p className="mt-3 text-sm leading-[1.8] text-muted-foreground">
                    {benefit.description}
                  </p>

                  {/* Bottom accent line */}
                  <div className="mt-6 h-0.5 w-10 rounded-full bg-primary/30 transition-all group-hover:w-16 group-hover:bg-primary/60" />
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </Container>
    </section>
  );
}