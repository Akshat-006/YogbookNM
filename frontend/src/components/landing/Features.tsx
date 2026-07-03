import { FEATURES } from "@/constants/features";
import { Container } from "@/components/layout/Container";
import { Card, CardContent } from "@/components/ui/card";

export function Features() {
  return (
    <section
      id="features"
      className="py-24"
    >
      <Container>
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="rounded-full border bg-muted px-4 py-2 text-sm font-medium">
            Features
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight lg:text-5xl">
            Everything you need
            <br />
            to manage your yoga journey.
          </h2>

          <p className="mt-6 text-muted-foreground">
            Yogbook combines bookings, appointments, payments,
            scheduling and instructor management into one
            beautifully designed platform.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <Card
                key={feature.title}
                className="group rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <CardContent className="space-y-5 p-8">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                    <Icon className="h-7 w-7 text-primary" />
                  </div>

                  <h3 className="text-xl font-semibold">
                    {feature.title}
                  </h3>

                  <p className="leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}