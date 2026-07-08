"use client";

import { Pencil, Trash2 } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { getDisplayClasses } from "@/features/classes/utils/visibleClasses";
import { AdminClass } from "../types/class.types";

interface Props {
  classes: AdminClass[];
  onEdit: (item: AdminClass) => void;
  onDelete: (id: string) => void;
}

export function ClassTable({
  classes,
  onEdit,
  onDelete,
}: Props) {
  const visibleClasses = getDisplayClasses(classes);

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle>
          Classes
        </CardTitle>
      </CardHeader>

      <CardContent>

        {visibleClasses.length === 0 ? (

          <p className="text-muted-foreground">

            No classes available.

          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="border-b">

                <tr>

                  <th className="py-3 text-left">
                    Title
                  </th>

                  <th className="text-left">
                    Instructor
                  </th>

                  <th className="text-left">
                    Price
                  </th>

                  <th className="text-left">
                    Capacity
                  </th>

                  <th className="text-left">
                    Date
                  </th>

                  <th className="text-center">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody>

                {visibleClasses.map((item) => (

                  <tr
                    key={item._id}
                    className="border-b"
                  >

                    <td className="py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{item.title}</span>
                        {item.recurring && (
                          <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-emerald-700">
                            Recurring
                          </span>
                        )}
                      </div>
                    </td>

                    <td>

                      {item.instructor_name}

                    </td>

                    <td>

                      ₹{item.price}

                    </td>

                    <td>

                      {item.capacity}

                    </td>

                    <td>

                      {new Date(
                        item.schedule_datetime
                      ).toLocaleDateString("en-IN")}

                    </td>

                    <td>

                      <div className="flex justify-center gap-2">

                        <Button
                          size="icon"
                          variant="outline"
                          onClick={() =>
                            onEdit(item)
                          }
                        >

                          <Pencil className="h-4 w-4" />

                        </Button>

                        <Button
                          size="icon"
                          variant="destructive"
                          onClick={() =>
                            onDelete(item._id)
                          }
                        >

                          <Trash2 className="h-4 w-4" />

                        </Button>

                      </div>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </CardContent>
    </Card>
  );
}