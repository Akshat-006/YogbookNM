"use client";

import { useMutation } from "@tanstack/react-query";

import { createPayment } from "../services/payment.service";

export function useCreatePayment() {

  return useMutation({

    mutationFn: createPayment,

  });

}