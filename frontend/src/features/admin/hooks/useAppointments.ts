import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  deleteAppointment,
  getAppointments,
  updateAppointment,
} from "../services/appointment.service";

export function useAppointments() {
  return useQuery({
    queryKey: ["admin-appointments"],
    queryFn: getAppointments,
  });
}

export function useUpdateAppointment() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: any;
    }) =>
      updateAppointment(id, payload),

    onSuccess: () =>

      queryClient.invalidateQueries({
        queryKey: [
          "admin-appointments",
        ],
      }),

  });

}

export function useDeleteAppointment() {

  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: deleteAppointment,

    onSuccess: () =>

      queryClient.invalidateQueries({
        queryKey: [
          "admin-appointments",
        ],
      }),

  });

}