"use client";
import { useQuery } from "@tanstack/react-query";
import { getPaymentHistory } from "../services/payment.service";
export function usePaymentHistory() {
  return useQuery({
    queryKey: ["payment-history"],
    queryFn: getPaymentHistory,
  });
}