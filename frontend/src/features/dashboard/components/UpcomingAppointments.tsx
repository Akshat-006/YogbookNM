"use client";

import { Appointment } from "../types/dashboard.types";

interface Props {

    appointments: Appointment[];

}

export function UpcomingAppointments({

    appointments,

}: Props) {

    if (!appointments.length) {

        return (

            <div className="rounded-3xl border p-6">

                No appointments booked.

            </div>

        );

    }

    return (

        <div className="rounded-3xl border p-6">

            <h2 className="text-xl font-semibold mb-6">

                My Appointments

            </h2>

            <div className="space-y-5">

                {appointments.map((item) => (

                    <div
                        key={item._id}
                        className="border rounded-xl p-4"
                    >

                        <p>

                            {new Date(
                                item.appointment_datetime
                            ).toLocaleString()}

                        </p>

                        <p>

                            {item.appointment_status}

                        </p>

                        {item.meet_link && (

                            <a

                                href={item.meet_link}

                                target="_blank"

                                className="text-teal-600"

                            >

                                Join Meeting

                            </a>

                        )}

                    </div>

                ))}

            </div>

        </div>

    );

}