import { Container } from "@/components/layout/Container";
import { POPULAR_CLASSES } from "@/constants/classes";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock3, UserRound } from "lucide-react";

export function PopularClasses() {
  return (
    <section id="classes" className="py-24">
      <Container>
        <div className="mb-16 text-center">
          <Badge variant="outline">Popular Classes</Badge>

          <h2 className="mt-6 text-4xl font-bold lg:text-5xl">
            Find the perfect class
            <br />
            for your wellness journey.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-muted-foreground">
            Choose from beginner-friendly sessions to advanced yoga
            practices led by experienced instructors.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {POPULAR_CLASSES.map((item) => (
            <Card
              key={item.title}
              className="group overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="h-52 bg-muted" />

              <CardContent className="space-y-5 p-6">
                <div className="flex items-center justify-between">
                  <Badge>{item.level}</Badge>

                  <span className="text-xl font-bold">
                    {item.price}
                  </span>
                </div>

                <h3 className="text-2xl font-semibold">
                  {item.title}
                </h3>

                <div className="space-y-3 text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <UserRound className="size-4" />
                    {item.instructor}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock3 className="size-4" />
                    {item.duration}
                  </div>
                </div>

                <Button className="mt-4 w-full rounded-full">
                  Book Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}