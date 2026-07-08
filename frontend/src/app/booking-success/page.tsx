import Link from "next/link";
import { CheckCircle2, CalendarDays, ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export default function BookingSuccessPage() {
  return (
    <Container className="py-28">
      <div className="mx-auto max-w-lg text-center">
        {/* Success icon with animated ring */}
        <div className="relative mx-auto mb-8 flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-primary/10 animate-ping opacity-30" />
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-primary/15">
            <CheckCircle2 className="h-10 w-10 text-primary" />
          </div>
        </div>

        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
          <Sparkles className="size-3.5" />
          Booking Confirmed
        </span>

        <h1 className="font-heading mt-5 text-4xl font-bold tracking-tight sm:text-5xl">
          You&apos;re all set! 🎉
        </h1>

        <p className="mx-auto mt-5 max-w-md text-lg leading-relaxed text-muted-foreground">
          Your payment was received successfully. A confirmation email with your class details,
          meeting link, and calendar invitation has been sent.
        </p>

        {/* Info card */}
        <div className="mt-10 rounded-2xl border border-border bg-card p-6 text-left shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
              <CalendarDays className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-semibold">Ready for your class?</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                Join using the meeting link in your email on the scheduled date and time.
                You can also access it from your Dashboard.
              </p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Button
            asChild
            variant="outline"
            className="rounded-full border-border px-7 font-semibold hover:border-primary/30 hover:shadow-sm"
          >
            <Link href="/classes">Browse More Classes</Link>
          </Button>

          <Button
            asChild
            className="rounded-full bg-primary px-7 font-semibold text-primary-foreground shadow-md hover:-translate-y-0.5 hover:shadow-lg transition-all"
          >
            <Link href="/dashboard">
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Container>
  );
}