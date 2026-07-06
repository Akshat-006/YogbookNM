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

interface Props {
  appointments: AdminAppointment[];

  onStatusChange: (
    appointment: AdminAppointment
  ) => void;

  onDelete: (
    appointment: AdminAppointment
  ) => void;
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
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "appointment_datetime",
      header: "Date",
      cell: ({ row }) =>
        new Date(
          row.original.appointment_datetime
        ).toLocaleString(),
    },
    {
      accessorKey: "appointment_status",
      header: "Status",
    },
    {
      id: "actions",
      header: "Actions",

      cell: ({ row }) => (

        <div className="flex gap-2">

          <Button
            size="sm"
            onClick={() =>
              onStatusChange(
                row.original
              )
            }
          >
            Update
          </Button>

          <Button
            variant="destructive"
            size="sm"
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
    <div className="rounded-xl border">

      <Table>

        <TableHeader>

          {table
            .getHeaderGroups()
            .map((group) => (

              <TableRow key={group.id}>

                {group.headers.map(
                  (header) => (

                    <TableHead
                      key={header.id}
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

              <TableRow key={row.id}>

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