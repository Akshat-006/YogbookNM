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
import { Video } from "lucide-react";

import { AdminBooking } from "../types/booking.types";

interface Props {
  bookings: AdminBooking[];
  onUpdate: (booking: AdminBooking) => void;
  onDelete: (booking: AdminBooking) => void;
}

function paymentPill(status: string) {
  if (status === "paid") return "pill-success";
  if (status === "pending") return "pill-warning";
  if (status === "failed") return "pill-danger";
  return "pill-neutral";
}

function bookingPill(status: string) {
  if (status === "booked") return "pill-info";
  if (status === "completed") return "pill-success";
  if (status === "cancelled") return "pill-danger";
  return "pill-neutral";
}

export function BookingTable({ bookings, onUpdate, onDelete }: Props) {
  const columns: ColumnDef<AdminBooking>[] = [
    {
      accessorKey: "user_name",
      header: "User",
      cell: ({ row }) => (
        <div>
          <p className="font-medium leading-tight">{row.original.user_name}</p>
          <p className="text-xs text-muted-foreground">{row.original.user_email}</p>
        </div>
      ),
    },
    {
      accessorKey: "class_title",
      header: "Class",
      cell: ({ row }) => (
        <div>
          <p className="text-sm">{row.original.class_title}</p>
          <p className="text-xs text-muted-foreground">{row.original.instructor_name}</p>
        </div>
      ),
    },
    {
      accessorKey: "booking_date",
      header: "Booked On",
      cell: ({ row }) => (
        <span className="text-xs text-muted-foreground">
          {new Date(row.original.booking_date).toLocaleDateString("en-IN")}
        </span>
      ),
    },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => (
        <span className="font-semibold">₹{row.original.amount}</span>
      ),
    },
    {
      accessorKey: "payment_status",
      header: "Payment",
      cell: ({ row }) => (
        <span className={paymentPill(row.original.payment_status)}>
          {row.original.payment_status}
        </span>
      ),
    },
    {
      accessorKey: "booking_status",
      header: "Booking",
      cell: ({ row }) => (
        <span className={bookingPill(row.original.booking_status)}>
          {row.original.booking_status}
        </span>
      ),
    },
    {
      id: "meet_link",
      header: "Meet Link",
      cell: ({ row }) =>
        row.original.meet_link ? (
          <a
            href={row.original.meet_link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/20 bg-blue-500/8 px-3 py-1 text-xs font-semibold text-blue-600 transition hover:bg-blue-500 hover:text-white"
          >
            <Video className="size-3.5" />
            Join
          </a>
        ) : (
          <span className="text-xs text-muted-foreground/50">—</span>
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
            onClick={() => onUpdate(row.original)}
          >
            Update
          </Button>
          <Button
            size="sm"
            variant="ghost"
            className="h-8 rounded-lg bg-destructive/8 text-xs font-semibold text-destructive hover:bg-destructive hover:text-white"
            onClick={() => onDelete(row.original)}
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
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-hidden rounded-2xl border border-border shadow-sm">
      <Table>
        <TableHeader className="bg-muted/40">
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id} className="border-border hover:bg-transparent">
              {group.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="border-border transition-colors hover:bg-muted/30">
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}