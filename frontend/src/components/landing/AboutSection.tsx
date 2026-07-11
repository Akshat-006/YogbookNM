"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

import { Container } from "@/components/layout/Container";
import { useCMSContentByKey } from "@/features/admin/hooks/useCMS";

import { useTranslations } from "next-intl";

export function AboutSection() {
  const t = useTranslations("About");
  const { data } = useCMSContentByKey("about");

  const title = data?.title ?? t("title");
  const subtitle = data?.subtitle ?? t("subtitle");
  const description = data?.description ?? t("description");
  const buttonText = data?.button_text ?? t("learnMore");
  const buttonLink = data?.button_link ?? "/classes";
  const imageSrc = data?.image ?? "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=85&auto=format&fit=crop";

  return (
    <section id="about" className="py-28 section-alt">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2 xl:gap-24">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="space-y-7"
          >
            <span className="inline-flex rounded-full border border-primary/20 bg-primary/8 px-5 py-2 text-sm font-semibold text-primary">
              {t("badge")}
            </span>

            <h2 className="font-heading max-w-lg text-4xl font-bold tracking-tight sm:text-5xl lg:text-[52px]">
              {title}
            </h2>

            <p className="max-w-lg text-xl leading-relaxed text-muted-foreground">
              {subtitle}
            </p>

            <p className="max-w-lg text-base leading-[1.85] text-muted-foreground">
              {description}
            </p>

            {/* Stats row */}
            {/* <div className="flex flex-wrap gap-8 border-t border-border pt-6">
              {[
                { value: "10K+", label: t("activeMembers") },
                { value: "500+", label: t("liveSessions") },
                { value: "50+", label: t("expertInstructors") },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-heading text-3xl font-bold text-primary">{stat.value}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div> */}

            <Link
              href={buttonLink}
              className="inline-flex items-center gap-2 text-base font-semibold text-primary transition-all hover:gap-3 hover:text-primary/80 cursor-pointer"
            >
              {buttonText}
              <ArrowRight className="size-4" />
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            className="relative"
          >
            {/* Decorative frame offset */}
            <div className="absolute -inset-3 -z-10 rounded-[40px] bg-primary/8" />
            <div className="overflow-hidden rounded-[32px] shadow-premium">
              <Image
                src={imageSrc}
                alt="About Yogbook"
                width={720}
                height={560}
                className="h-full w-full object-cover"
              />
            </div>
            {/* Floating accent */}
            <div className="glass absolute -bottom-5 -right-5 rounded-2xl px-5 py-4 shadow-premium">
              <p className="text-sm font-bold">{t("floatingBadge")}</p>
              <p className="text-xs text-muted-foreground">{t("floatingSubtitle")}</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
