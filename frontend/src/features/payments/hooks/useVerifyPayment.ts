import { useMutation } from "@tanstack/react-query";
import {
  verifyPayment,
} from "../services/verify-payment.service";

export function useVerifyPayment() {
  return useMutation({
    mutationFn: verifyPayment,
  });
}