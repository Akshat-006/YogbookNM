import api from "@/services/api";

export async function sendOTP(email: string) {
  const { data } = await api.post("/otp/send", {
    email,
  });

  return data;
}

export async function verifyOTP(
  email: string,
  otp: string
) {
  const { data } = await api.post("/otp/verify", {
    email,
    otp,
  });

  return data;
}