import { Container } from "@/components/layout/Container";
import { benefits } from "@/constants/benefits";

export function Benefits() {
  return (
    <section className="py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">

          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Benefits
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight lg:text-6xl">
            Discover the Benefits
            <br />
            of Yoga
          </h2>

          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            Yoga is more than exercise—it's a path to a healthier body, calmer
            mind and balanced lifestyle.
          </p>

        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {benefits.map((benefit) => {
            const Icon = benefit.icon;

            return (
              <div
                key={benefit.title}
                className="rounded-3xl border bg-background p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10">
                  <Icon className="size-7 text-primary" />
                </div>

                <h3 className="mt-6 text-2xl font-semibold">
                  {benefit.title}
                </h3>

                <p className="mt-4 leading-7 text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            );
          })}

        </div>
      </Container>
    </section>
  );
}