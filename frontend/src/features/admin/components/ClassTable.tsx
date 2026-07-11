"use client";

import { Pencil, Trash2, Video } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { getDisplayClasses } from "@/features/classes/utils/visibleClasses";
import { AdminClass } from "../types/class.types";
import { formatDateTime } from "@/lib/formatTime";

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
    <Card className="rounded-2xl shadow-sm">
      <CardHeader className="border-b border-border px-6 py-5">
        <CardTitle className="font-heading text-base font-bold">
          Classes
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">

        {visibleClasses.length === 0 ? (

          <p className="px-6 py-8 text-sm text-muted-foreground">

            No classes available.

          </p>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-sm">

              <thead className="border-b border-border bg-muted/40">

                <tr>

                  <th className="px-6 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Title
                  </th>

                  <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Instructor
                  </th>

                  <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Price
                  </th>

                  <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Capacity
                  </th>

                  <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Date
                  </th>

                  <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Meet Link
                  </th>

                  <th className="px-4 py-3.5 text-center text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Actions
                  </th>

                </tr>

              </thead>

              <tbody className="divide-y divide-border">

                {visibleClasses.map((item) => (

                  <tr
                    key={item._id}
                    className="transition-colors hover:bg-muted/30"
                  >

                    <td className="px-6 py-4">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-medium">{item.title}</span>
                        {item.recurring && (
                          <span className="pill-success">Recurring</span>
                        )}
                      </div>
                    </td>

                    <td className="px-4 py-4 text-muted-foreground">

                      {item.instructor_name}

                    </td>

                    <td className="px-4 py-4 font-medium">

                      ₹{item.price}

                    </td>

                    <td className="px-4 py-4 text-muted-foreground">

                      {item.capacity}

                    </td>

                    <td className="px-4 py-4 text-muted-foreground">

                      {formatDateTime(item.schedule_datetime)}

                    </td>

                    <td className="px-4 py-4">

                      {item.meet_link ? (
                        <a
                          href={item.meet_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 px-3 py-1 text-xs font-semibold text-blue-600 transition hover:bg-blue-500 hover:text-white"
                        >
                          <Video className="size-3.5" />
                          Join
                        </a>
                      ) : (
                        <span className="text-xs text-muted-foreground/50">—</span>
                      )}

                    </td>

                    <td className="px-4 py-4">

                      <div className="flex justify-center gap-2">

                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-xl hover:bg-primary/10 hover:text-primary"
                          onClick={() =>
                            onEdit(item)
                          }
                        >

                          <Pencil className="h-3.5 w-3.5" />

                        </Button>

                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-8 w-8 rounded-xl hover:bg-destructive/10 hover:text-destructive"
                          onClick={() =>
                            onDelete(item._id)
                          }
                        >

                          <Trash2 className="h-3.5 w-3.5" />

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