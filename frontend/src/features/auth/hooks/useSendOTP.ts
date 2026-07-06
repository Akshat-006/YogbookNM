import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "../services/auth.service";

export function useSendOTP() {
  return useMutation({
    mutationFn: sendOTP,
  });
}