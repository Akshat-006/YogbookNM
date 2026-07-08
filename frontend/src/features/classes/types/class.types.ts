export interface YogaClass {
  _id: string;
  title: string;
  description: string;
  instructor_name: string;
  duration: number;
  capacity: number;
  price: number;
  schedule_datetime: string;
  is_active: boolean;
  meet_link?: string;
  recurring?: boolean;
  recurring_type?: "none" | "daily" | "weekly";
  recurring_until?: string;
  series_id?: string | null;
}