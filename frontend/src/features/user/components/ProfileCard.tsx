"use client";

import { Card, CardContent } from "@/components/ui/card";

interface User {
  name: string;
  email: string;
}

interface Props {
  user: User;
}

export function ProfileCard({
  user,
}: Props) {
  return (
    <Card className="rounded-3xl">
      <CardContent className="flex flex-col gap-3 p-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Welcome Back 👋
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            {user.name}
          </h2>

          <p className="mt-1 text-muted-foreground">
            {user.email}
          </p>
        </div>

        <div className="rounded-2xl bg-primary/10 px-6 py-4">
          <p className="text-sm text-muted-foreground">
            Account Status
          </p>

          <p className="mt-1 font-semibold text-primary">
            Active
          </p>
        </div>
      </CardContent>
    </Card>
  );
}