"use client";

import { ClassBooking } from "../types/dashboard.types";

interface Props {
    classes: ClassBooking[];
}

export function UpcomingClasses({

    classes,

}: Props) {

    if (!classes.length) {

        return (

            <div className="rounded-3xl border p-6">

                No booked classes.

            </div>

        );

    }

    return (

        <div className="rounded-3xl border p-6">

            <h2 className="text-xl font-semibold mb-6">

                My Classes

            </h2>

            <div className="space-y-5">

                {classes.map((item) => (

                    <div
                        key={item._id}
                        className="border rounded-xl p-4"
                    >

                        <h3 className="font-semibold">

                            {item.class_title}

                        </h3>

                        <p>

                            {item.instructor_name}

                        </p>

                        <p>

                            {new Date(
                                item.schedule_datetime
                            ).toLocaleString()}

                        </p>

                        <p>

                            Payment :
                            {" "}
                            {item.payment_status}

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