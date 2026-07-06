import Link from "next/link";
import { CheckCircle2, CalendarDays, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/layout/Container";

export default function BookingSuccessPage() {
  return (
    <Container className="py-24">
      <div className="mx-auto max-w-2xl rounded-3xl border bg-card p-10 text-center shadow-lg">

        <CheckCircle2 className="mx-auto h-20 w-20 text-green-500" />

        <h1 className="mt-6 text-4xl font-bold">
          Booking Confirmed
        </h1>

        <p className="mt-4 text-muted-foreground">
          Your payment has been received successfully.
          A confirmation email containing your class details,
          meeting link and calendar invitation has been sent.
        </p>

        <div className="mt-10 rounded-2xl bg-muted p-6 text-left">

          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary" />
            <span>
              Please join the class on your scheduled date and time.
            </span>
          </div>

        </div>

        <div className="mt-10 flex justify-center gap-5">

          <Link href="/classes">
            <Button variant="outline">
              Browse More Classes
            </Button>
          </Link>

          <Link href="/dashboard">
            <Button>
              Go to Dashboard

              <ArrowRight className="ml-2 h-4 w-4"/>
            </Button>
          </Link>

        </div>

      </div>
    </Container>
  );
}