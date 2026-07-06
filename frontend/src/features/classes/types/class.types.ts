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
}