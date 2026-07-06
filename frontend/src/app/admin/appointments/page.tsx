"use client";

import { useState } from "react";

import { AppointmentTable } from "@/features/admin/components/AppointmentTable";
import { DeleteClassDialog } from "@/features/admin/components/DeleteClassDialog";
import { UpdateAppointmentDialog } from "@/features/admin/components/UpdateAppointmentDialog";

import {
  useAppointments,
  useDeleteAppointment,
  useUpdateAppointment,
} from "@/features/admin/hooks/useAppointments";

import { AdminAppointment } from "@/features/admin/types/appointment.types";

export default function AdminAppointmentsPage() {

  const { data = [], isLoading } = useAppointments();

  const updateAppointment =
    useUpdateAppointment();

  const deleteAppointment =
    useDeleteAppointment();

  const [
    selectedAppointment,
    setSelectedAppointment,
  ] =
    useState<AdminAppointment | null>(
      null
    );

  const [
    statusOpen,
    setStatusOpen,
  ] = useState(false);

  const [
    deleteOpen,
    setDeleteOpen,
  ] = useState(false);

  async function handleStatus(
    status: string
  ) {

    if (!selectedAppointment) return;

    await updateAppointment.mutateAsync({

      id: selectedAppointment._id,

      payload: {
        appointment_status:
          status,
      },

    });

    setStatusOpen(false);

  }

  async function handleDelete() {

    if (!selectedAppointment) return;

    await deleteAppointment.mutateAsync(
      selectedAppointment._id
    );

    setDeleteOpen(false);

  }

  if (isLoading) {

    return (
      <p className="p-10">
        Loading...
      </p>
    );

  }

  return (

    <div className="space-y-8 p-8">

      <h1 className="text-3xl font-bold">

        Appointment Management

      </h1>

      <AppointmentTable

        appointments={data}

        onStatusChange={(
          appointment
        ) => {

          setSelectedAppointment(
            appointment
          );

          setStatusOpen(true);

        }}

        onDelete={(
          appointment
        ) => {

          setSelectedAppointment(
            appointment
          );

          setDeleteOpen(true);

        }}

      />

      <UpdateAppointmentDialog

        open={statusOpen}

        onOpenChange={
          setStatusOpen
        }

        currentStatus={
          selectedAppointment
            ?.appointment_status ??
          "booked"
        }

        loading={
          updateAppointment.isPending
        }

        onSubmit={
          handleStatus
        }

      />

      <DeleteClassDialog

        open={deleteOpen}

        onOpenChange={
          setDeleteOpen
        }

        loading={
          deleteAppointment.isPending
        }

        onDelete={
          handleDelete
        }

      />

    </div>

  );

}