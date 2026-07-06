import api from "@/services/api";
import { YogaClass } from "../types/class.types";

export async function getClasses(): Promise<YogaClass[]> {
  const { data } = await api.get("/classes");

  return data.filter((item: YogaClass) => item.is_active);
}