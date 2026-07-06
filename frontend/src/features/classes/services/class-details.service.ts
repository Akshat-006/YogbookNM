import api from "@/services/api";
import { YogaClass } from "../types/class.types";

export async function getClassById(id: string): Promise<YogaClass> {
  const { data } = await api.get(`/classes/${id}`);
  return data;
}