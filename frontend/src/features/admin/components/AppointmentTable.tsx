"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";

import { AdminAppointment } from "../types/appointment.types";
import { formatDateTime } from "@/lib/formatTime";

interface Props {
  appointments: AdminAppointment[];

  onStatusChange: (
    appointment: AdminAppointment
  ) => void;

  onDelete: (
    appointment: AdminAppointment
  ) => void;
}

function statusPill(status: string) {
  if (status === "completed") return "pill-success";
  if (status === "booked") return "pill-info";
  if (status === "cancelled") return "pill-danger";
  return "pill-neutral";
}

export function AppointmentTable({
  appointments,
  onStatusChange,
  onDelete,
}: Props) {
  const columns: ColumnDef<AdminAppointment>[] = [
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => (
        <span className="font-medium">{row.original.name}</span>
      ),
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.original.email}</span>
      ),
    },
    {
      accessorKey: "appointment_datetime",
      header: "Date",
      cell: ({ row }) => (
        <span className="text-muted-foreground">
          {formatDateTime(row.original.appointment_datetime)}
        </span>
      ),
    },
    {
      accessorKey: "appointment_status",
      header: "Status",
      cell: ({ row }) => (
        <span className={statusPill(row.original.appointment_status)}>
          {row.original.appointment_status}
        </span>
      ),
    },
    {
      id: "actions",
      header: "Actions",

      cell: ({ row }) => (

        <div className="flex gap-2">

          <Button
            size="sm"
            variant="ghost"
            className="h-8 rounded-lg bg-primary/8 text-xs font-semibold text-primary hover:bg-primary hover:text-primary-foreground"
            onClick={() =>
              onStatusChange(
                row.original
              )
            }
          >
            Update
          </Button>

          <Button
            size="sm"
            variant="ghost"
            className="h-8 rounded-lg bg-destructive/8 text-xs font-semibold text-destructive hover:bg-destructive hover:text-white"
            onClick={() =>
              onDelete(
                row.original
              )
            }
          >
            Delete
          </Button>

        </div>

      ),
    },
  ];

  const table = useReactTable({
    data: appointments,
    columns,
    getCoreRowModel:
      getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-border shadow-sm">

      <Table>

        <TableHeader className="bg-muted/40">

          {table
            .getHeaderGroups()
            .map((group) => (

              <TableRow key={group.id} className="border-border hover:bg-transparent">

                {group.headers.map(
                  (header) => (

                    <TableHead
                      key={header.id}
                      className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                    >

                      {flexRender(
                        header.column
                          .columnDef.header,
                        header.getContext()
                      )}

                    </TableHead>

                  )
                )}

              </TableRow>

            ))}

        </TableHeader>

        <TableBody>

          {table
            .getRowModel()
            .rows.map((row) => (

              <TableRow key={row.id} className="border-border transition-colors hover:bg-muted/30">

                {row
                  .getVisibleCells()
                  .map((cell) => (

                    <TableCell
                      key={cell.id}
                    >

                      {flexRender(
                        cell.column
                          .columnDef.cell,
                        cell.getContext()
                      )}

                    </TableCell>

                  ))}

              </TableRow>

            ))}

        </TableBody>

      </Table>

    </div>
  );
}