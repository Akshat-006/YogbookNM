import { useMutation } from "@tanstack/react-query";
import { verifyOTP } from "../services/otp.service";

export function useVerifyOTP() {
  return useMutation({
    mutationFn: ({
      email,
      otp,
    }: {
      email: string;
      otp: string;
    }) => verifyOTP(email, otp),
  });
}