import api from "@/services/api";
import { CMSContent } from "../types/cms.types";

export async function getCMSContent(): Promise<CMSContent[]> {
  const { data } = await api.get<CMSContent[]>("/cms");
  return data;
}
