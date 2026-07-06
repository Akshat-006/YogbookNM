"use client";

import { useDashboard } from "../hooks/useDashboard";

import { Container } from "@/components/layout/Container";

import { UpcomingClasses } from "./UpcomingClasses";
import { UpcomingAppointments } from "./UpcomingAppointments";

export function Dashboard() {

    const {

        data,

        isLoading,

        isError

    } = useDashboard();

    if (isLoading) {

        return (

            <Container>

                <p>Loading Dashboard...</p>

            </Container>

        );

    }

    if (isError) {
        return (
            <Container>
                <p>Unable to load dashboard.</p>
            </Container>
        );
    }

    return (

        <Container className="py-20">

            <h1 className="text-4xl font-bold">
                Welcome Back 👋
            </h1>
            <p className="mt-2 text-muted-foreground">
                {data?.profile.email}
            </p>
            <div className="grid gap-6 mt-10 md:grid-cols-3">

                <StatCard
                    title="Yoga Classes"
                    value={data?.statistics.total_bookings ?? 0}
                />

                <StatCard
                    title="Appointments"
                    value={data?.statistics.total_appointments ?? 0}
                />

                <StatCard
                    title="Payments"
                    value={data?.statistics.completed_payments ?? 0}
                />

            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-2">

                <UpcomingClasses

                    classes={data?.upcoming_classes ?? []}

                />

                <UpcomingAppointments

                    appointments={
                        data?.upcoming_appointments ?? []
                    }/>

            </div>

        </Container>
    );
}

function StatCard({
    title,
    value,
}: {
    title: string;
    value: number;
}) {
    return (
        <div className="rounded-3xl border p-8">
            <p className="text-muted-foreground">
                {title}
            </p>
            <h2 className="mt-3 text-4xl font-bold">
                {value}
            </h2>
        </div>
    );
}