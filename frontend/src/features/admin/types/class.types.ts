export interface AdminClass {
  _id: string;
  title: string;
  description: string;
  instructor_name: string;
  duration: number;
  capacity: number;
  price: number;
  schedule_datetime: string;
  meet_link?: string;
  is_active: boolean;
  recurring: boolean;

  recurring_type:
    | "none"
    | "daily"
    | "weekly";

  recurring_until?: string;
}