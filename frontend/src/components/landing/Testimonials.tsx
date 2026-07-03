import { Container } from "@/components/layout/Container";
import { TESTIMONIALS } from "@/constants/testimonials";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

export function Testimonials() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <p className="font-semibold text-primary">
            Testimonials
          </p>

          <h2 className="mt-4 text-4xl font-bold lg:text-5xl">
            Loved by yoga practitioners.
          </h2>

          <p className="mt-5 text-muted-foreground">
            Thousands of users trust Yogbook to manage their yoga
            journey every day.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {TESTIMONIALS.map((item) => (
            <Card
              key={item.name}
              className="rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <CardContent className="space-y-6 p-8">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className="size-4 fill-current text-yellow-500"
                    />
                  ))}
                </div>

                <p className="leading-7 text-muted-foreground">
                  "{item.review}"
                </p>

                <div>
                  <h3 className="font-semibold">
                    {item.name}
                  </h3>

                  <p className="text-sm text-muted-foreground">
                    {item.role}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}