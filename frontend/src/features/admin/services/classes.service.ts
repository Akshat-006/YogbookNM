import api from "@/services/api";

import { AdminClass } from "../types/class.types";

function authHeader() {
  return {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
}

export async function getClasses() {
  const { data } = await api.get<AdminClass[]>(
    "/classes",
    authHeader()
  );

  return data;
}

export async function createClass(
  payload: Partial<AdminClass>
) {
  const { data } = await api.post(
    "/classes",
    payload,
    authHeader()
  );

  return data;
}

export async function updateClass(
  id: string,
  payload: Partial<AdminClass>
) {
  const { data } = await api.put(
    `/classes/${id}`,
    payload,
    authHeader()
  );

  return data;
}

export async function deleteClass(id: string) {
  const { data } = await api.delete(
    `/classes/${id}`,
    authHeader()
  );

  return data;
}