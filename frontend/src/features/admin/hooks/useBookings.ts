import {

  useMutation,

  useQuery,

  useQueryClient,

} from "@tanstack/react-query";

import {

  deleteBooking,

  getBookings,

  updateBooking,

} from "../services/booking.service";

export function useBookings() {

  return useQuery({

    queryKey: [
      "admin-bookings"
    ],

    queryFn: getBookings,

  });

}

export function useUpdateBooking() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn: ({

      id,

      payload,

    }: {

      id: string;

      payload: any;

    }) =>

      updateBooking(
        id,
        payload
      ),

    onSuccess: () =>

      queryClient.invalidateQueries({

        queryKey: [
          "admin-bookings"
        ],

      }),

  });

}

export function useDeleteBooking() {

  const queryClient =
    useQueryClient();

  return useMutation({

    mutationFn:
      deleteBooking,

    onSuccess: () =>

      queryClient.invalidateQueries({

        queryKey: [
          "admin-bookings"
        ],

      }),

  });

}