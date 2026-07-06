import api from "@/services/api";
import { DashboardResponse } from "../types/dashboard.types";

export async function getDashboard(): Promise<DashboardResponse> {

    const { data } = await api.get(
        "/user/dashboard"
    );

    return data;

}