"use client";

import { useQuery } from "@tanstack/react-query";
import { getCMSContent } from "@/features/admin/services/cms.service";
import { Container } from "@/components/layout/Container";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { HelpCircle, ChevronRight } from "lucide-react";
import Link from "next/link";

export function FAQPageClient() {
  // Fetch CMS items client-side
  const { data = [], isLoading, isError } = useQuery({
    queryKey: ["cms-faq"],
    queryFn: getCMSContent,
    staleTime: 1000 * 60 * 5, // 5 minutes cache
  });

  // Filter and sort active FAQs
  const faqs = data
    .filter((item) => item.key.startsWith("faq_") && item.is_active)
    .sort((a, b) => {
      const orderA = a.order !== undefined && a.order !== null ? Number(a.order) : 9999;
      const orderB = b.order !== undefined && b.order !== null ? Number(b.order) : 9999;
      if (orderA !== orderB) return orderA - orderB;
      return a.key.localeCompare(b.key);
    });

  return (
    <div className="relative min-h-[70vh] py-20 overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background">
      {/* Decorative background glow */}
      <div className="absolute top-1/4 left-1/2 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />

      <Container className="max-w-3xl">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground">
          <Link href="/" className="transition-colors hover:text-primary">
            Home
          </Link>
          <ChevronRight className="size-3.5" />
          <span className="text-primary">FAQ</span>
        </div>

        {/* Header */}
        <div className="mb-16 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
          >
            <HelpCircle className="size-7" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl"
          >
            Frequently Asked Questions
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg leading-relaxed text-muted-foreground max-w-xl mx-auto"
          >
            Got questions about classes, bookings, appointments, or pricing? We've got answers.
          </motion.p>
        </div>

        {/* Content */}
        {isLoading && (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-16 animate-pulse rounded-2xl bg-muted/60" />
            ))}
          </div>
        )}

        {isError && (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-6 text-center text-sm text-destructive">
            Could not load FAQs right now. Please try again in a moment.
          </div>
        )}

        {!isLoading && !isError && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-premium"
          >
            {faqs.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No FAQs available at the moment. Please check back later.
              </p>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((item, index) => (
                  <AccordionItem
                    key={item._id}
                    value={`item-${index}`}
                    className="border-b border-border py-2 last:border-b-0"
                  >
                    <AccordionTrigger className="text-left font-heading text-base font-semibold hover:text-primary transition-colors py-4">
                      {item.title}
                    </AccordionTrigger>
                    <AccordionContent className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap pt-2 pb-4">
                      {item.description}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </motion.div>
        )}
      </Container>
    </div>
  );
}
