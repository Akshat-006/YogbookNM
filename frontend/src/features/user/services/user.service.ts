import api from "@/services/api";

export async function getDashboard(email: string) {
  const { data } = await api.get(
    `/user/dashboard?email=${email}`
  );

  return data;
}