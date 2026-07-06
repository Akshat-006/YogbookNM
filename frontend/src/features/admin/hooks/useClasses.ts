"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import {
  createClass,
  deleteClass,
  getClasses,
  updateClass,
} from "../services/classes.service";

export function useClasses() {
  return useQuery({
    queryKey: ["admin-classes"],
    queryFn: getClasses,
  });
}

export function useCreateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createClass,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-classes"],
      });
    },
  });
}

export function useUpdateClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: any;
    }) => updateClass(id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-classes"],
      });
    },
  });
}

export function useDeleteClass() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteClass,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin-classes"],
      });
    },
  });
}