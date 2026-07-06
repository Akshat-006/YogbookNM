import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "../services/auth.service";

export function useVerifyOTP() {
  return useMutation({
    mutationFn: verifyOTP,
  });
}