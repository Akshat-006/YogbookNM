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

import { AdminBooking } from "../types/booking.types";

interface Props {
  bookings: AdminBooking[];

  onUpdate: (booking: AdminBooking) => void;

  onDelete: (booking: AdminBooking) => void;
}

export function BookingTable({
  bookings,
  onUpdate,
  onDelete,
}: Props) {
  const columns: ColumnDef<AdminBooking>[] = [
    {
      accessorKey: "user_name",
      header: "User",
    },
    {
      accessorKey: "class_title",
      header: "Class",
    },
    {
      accessorKey: "booking_date",
      header: "Date",
      cell: ({ row }) =>
        new Date(
          row.original.booking_date
        ).toLocaleString(),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) =>
        `₹${row.original.amount}`,
    },
    {
      accessorKey: "payment_status",
      header: "Payment",
    },
    {
      accessorKey: "booking_status",
      header: "Booking",
    },
    {
      id: "actions",

      header: "Actions",

      cell: ({ row }) => (

        <div className="flex gap-2">

          <Button
            size="sm"
            onClick={() =>
              onUpdate(
                row.original
              )
            }
          >
            Update
          </Button>

          <Button
            size="sm"
            variant="destructive"
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
    data: bookings,
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

                    <TableHead key={header.id}>

                      {flexRender(
                        header.column.columnDef.header,
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

                    <TableCell key={cell.id}>

                      {flexRender(
                        cell.column.columnDef.cell,
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