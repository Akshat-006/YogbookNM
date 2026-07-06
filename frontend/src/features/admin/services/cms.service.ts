import api from "@/services/api";
import { CMSContent } from "../types/cms.types";

export async function getCMSContent(): Promise<CMSContent[]> {
  const { data } = await api.get<CMSContent[]>("/cms");
  return data;
}

export async function getCMSContentByKey(key: string): Promise<CMSContent> {
  const { data } = await api.get<CMSContent>(`/cms/${key}`);
  return data;
}

export async function createCMSContent(payload: Record<string, unknown>): Promise<CMSContent> {
  const { data } = await api.post<CMSContent>("/cms", payload);
  return data;
}

export async function updateCMSContent(id: string, payload: Record<string, unknown>): Promise<CMSContent> {
  const { data } = await api.put<CMSContent>(`/cms/${id}`, payload);
  return data;
}

export async function deleteCMSContent(id: string): Promise<{ message: string }> {
  const { data } = await api.delete<{ message: string }>(`/cms/${id}`);
  return data;
}

export async function uploadCMSAsset(file: File): Promise<{ url: string; public_id: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const { data } = await api.post<{ url: string; public_id: string }>("/upload/image", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
}
