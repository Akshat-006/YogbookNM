import { useMutation } from "@tanstack/react-query";
import { sendOTP } from "../services/otp.service";

export function useSendOTP() {
  return useMutation({
    mutationFn: sendOTP,
  });
}