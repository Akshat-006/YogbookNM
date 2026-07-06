"use client";

import { useClassById } from "../hooks/useClassById";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Calendar, Clock3, IndianRupee, UserRound, Users } from "lucide-react";
import { BookClassDialog } from "@/features/bookings/components/BookClassDialog";

interface Props {
  id: string;
}

export function ClassDetails({ id }: Props) {
  const { data, isLoading } = useClassById(id);

  if (isLoading) {
    return <Container className="py-24">Loading...</Container>;
  }

  if (!data) {
    return <Container className="py-24">Class not found.</Container>;
  }

  return (
    <section className="py-24">
      <Container>
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="aspect-[4/3] rounded-3xl border bg-muted" />

          <div>
            <h1 className="text-5xl font-bold">{data.title}</h1>

            <p className="mt-6 text-muted-foreground">{data.description}</p>

            <div className="mt-10 space-y-5">
              <div className="flex items-center gap-3">
                <UserRound size={18} />
                {data.instructor_name}
              </div>

              <div className="flex items-center gap-3">
                <Clock3 size={18} />
                {data.duration} Minutes
              </div>

              <div className="flex items-center gap-3">
                <Users size={18} />
                Capacity {data.capacity}
              </div>

              <div className="flex items-center gap-3">
                <Calendar size={18} />
                {new Date(data.schedule_datetime).toLocaleString()}
              </div>

              <div className="flex items-center gap-3 text-2xl font-bold">
                <IndianRupee size={20} />
                {data.price}
              </div>
            </div>
            <BookClassDialog classId={data._id} />
          </div>
        </div>
      </Container>
    </section>
  );
}
