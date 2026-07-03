import Link from "next/link";
import { Flower2 } from "lucide-react";

import { Container } from "@/components/layout/Container";

export function Footer() {
  return (
    <footer
      id="contact"
      className="border-t py-12"
    >
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
              Modern yoga management platform for classes,
              appointments and wellness.
            </p>
          </div>

          <div>
            <h3 className="font-semibold">
              Product
            </h3>

            <div className="mt-4 flex flex-col gap-2">
              <Link href="#">Classes</Link>
              <Link href="#">Bookings</Link>
              <Link href="#">Appointments</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">
              Company
            </h3>

            <div className="mt-4 flex flex-col gap-2">
              <Link href="#">About</Link>
              <Link href="#">Contact</Link>
              <Link href="#">Privacy</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold">
              Contact
            </h3>

            <div className="mt-4 space-y-2 text-muted-foreground">
              <p>support@yogbook.com</p>
              <p>+91 98765 43210</p>
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