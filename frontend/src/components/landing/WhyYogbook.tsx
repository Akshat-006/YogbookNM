import { Container } from "@/components/layout/Container";
import { WHY_YOGBOOK } from "@/constants/why-yogbook";
import { Card } from "@/components/ui/card";

export function WhyYogbook() {
  return (
    <section className="py-24">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="text-primary font-semibold">
              Why Yogbook
            </p>

            <h2 className="mt-4 text-4xl font-bold lg:text-5xl">
              Everything designed
              <br />
              around simplicity.
            </h2>

            <p className="mt-6 text-muted-foreground">
              From class booking to payments and calendar
              integration, everything works together in one
              seamless experience.
            </p>

            <div className="mt-10 space-y-5">
              {WHY_YOGBOOK.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex gap-4"
                  >
                    <div className="rounded-xl bg-primary/10 p-3">
                      <Icon className="size-5 text-primary" />
                    </div>

                    <div>
                      <h3 className="font-semibold">
                        {item.title}
                      </h3>

                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Card className="rounded-3xl p-10">
            <div className="aspect-square rounded-2xl bg-muted" />
          </Card>
        </div>
      </Container>
    </section>
  );
}