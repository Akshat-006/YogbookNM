import Link from "next/link";
import { Flower2, Share2 } from "lucide-react";

import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer className="border-t py-12">
      <Container>
        <div className="grid gap-10 lg:grid-cols-4">

          <div>
            <div className="flex items-center gap-2">
              <Flower2 className="size-6 text-primary" />

              <span className="text-xl font-bold">
                Yogbook
              </span>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              Modern yoga platform for classes, appointments, and wellbeing.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">Product</h3>

            <div className="mt-4 flex flex-col gap-2">
              <Link href="/classes">Classes</Link>
              <Link href="/booking-success">Bookings</Link>
              <Link href="/appointments">Appointments</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Company</h3>

            <div className="mt-4 flex flex-col gap-2">
              <Link href="#about">About</Link>
              <Link href="#contact">Contact</Link>
              <Link href="/privacy">Privacy</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">Connect</h3>

            <div className="mt-4 space-y-3 text-muted-foreground">
              <p>support@yogbook.com</p>
              <p>+91 98765 43210</p>
              <div className="mt-4 flex items-center gap-3 text-muted-foreground">
                <Link href="https://instagram.com/yogbook" target="_blank" aria-label="Instagram" className="transition hover:text-primary">
                  <Share2 className="size-5" />
                </Link>
                <Link href="https://twitter.com/yogbook" target="_blank" aria-label="Twitter" className="transition hover:text-primary">
                  <Share2 className="size-5" />
                </Link>
                <Link href="https://youtube.com/yogbook" target="_blank" aria-label="YouTube" className="transition hover:text-primary">
                  <Share2 className="size-5" />
                </Link>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 border-t pt-6 text-center text-sm text-muted-foreground">
          © 2026 Yogbook. All rights reserved.
        </div>
      </Container>
    </footer>
  );
}