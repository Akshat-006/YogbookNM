"use client";

import { useQuery } from "@tanstack/react-query";

import { getPaymentAnalytics } from "../services/payment.service";

export function usePaymentAnalytics() {

  return useQuery({

    queryKey: ["payment-analytics"],

    queryFn: getPaymentAnalytics,

  });

}