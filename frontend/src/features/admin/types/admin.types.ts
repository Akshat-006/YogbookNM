/**
 * Matches the actual API response shape from GET /dashboard/
 * Backend returns: { stats: {...}, monthly_revenue: {}, recent_payments: [], upcoming_classes: [], upcoming_appointments: [] }
 */
export interface DashboardStatsData {
  total_classes: number;
  total_users: number;
  total_bookings: number;
  total_appointments: number;
  total_payments: number;
  completed_payments: number;
  pending_payments: number;
  total_revenue: number;
  payment_counts: {
    paid: number;
    pending: number;
    failed: number;
  };
}

export interface DashboardMonthlyRevenue {
  month: string;
  revenue: number;
}

export interface DashboardStats {
  stats: DashboardStatsData;
  monthly_revenue: Record<string, number>;
  monthly_revenue_breakdown: DashboardMonthlyRevenue[];
  recent_payments: RecentPayment[];
  upcoming_classes: UpcomingClass[];
  upcoming_appointments: UpcomingAppointment[];
}

export interface RecentPayment {
  name?: string;
  amount?: number;
  status?: string;
  date?: string;
}

export interface UpcomingClass {
  title: string;
  datetime: string;
  instructor: string;
  capacity: number;
}

export interface UpcomingAppointment {
  name: string;
  datetime: string;
}

export interface RecentBooking {
  _id: string;
  name: string;
  class_name: string;
  booking_status: string;
  payment_status: string;
}

export interface RecentAppointment {
  _id: string;
  name: string;
  appointment_datetime: string;
  appointment_status: string;
}