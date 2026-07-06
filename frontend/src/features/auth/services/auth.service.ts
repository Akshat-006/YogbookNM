import api from "@/services/api";
import {
  SendOTPRequest,
  VerifyOTPRequest,
  VerifyOTPResponse,
} from "../types/auth.types";

export async function sendOTP(
  payload: SendOTPRequest
) {
  const { data } = await api.post(
    "/auth/send-otp",
    payload
  );

  return data;
}

export async function verifyOTP(
  payload: VerifyOTPRequest
): Promise<VerifyOTPResponse> {

  const { data } = await api.post(
    "/auth/verify-otp",
    payload
  );

  return data;
}