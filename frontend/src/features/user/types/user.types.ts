export interface UserProfile {
  name: string;
  email: string;
  phone: string;
}

export interface DashboardData {
  profile: UserProfile;

  appointments: any[];

  class_bookings: any[];

  payments: any[];
}