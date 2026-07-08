import { Container } from "@/components/layout/Container";
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl space-y-8 rounded-3xl border bg-background p-12 shadow-sm">
          <div className="space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Privacy Policy
            </p>
            <h1 className="text-4xl font-bold">Privacy & Data Protection</h1>
            <p className="text-lg leading-8 text-muted-foreground">
              Yogbook is committed to protecting your personal data. We only collect information necessary to deliver bookings, appointments, and support your wellness journey.
            </p>
          </div>

          <div className="space-y-6 text-sm leading-7 text-muted-foreground">
            <div>
              <h2 className="text-xl font-semibold">What we collect</h2>
              <p className="mt-2">
                We collect your name, contact information, and booking preferences to process appointments and class registrations. Payment details are handled securely by Razorpay.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">How we use it</h2>
              <p className="mt-2">
                Your information is used to communicate booking confirmations, send appointment reminders, and improve the Yogbook experience.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold">Your choices</h2>
              <p className="mt-2">
                You can contact support anytime at&nbsp;
                <Link href="mailto:support@yogbook.com" className="font-semibold text-primary">
                  support@yogbook.com
                </Link>
                &nbsp;to update or remove your information.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
