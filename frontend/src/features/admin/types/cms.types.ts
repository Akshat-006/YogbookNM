export interface CMSContent {
  _id: string;
  key: string;
  title?: string | null;
  subtitle?: string | null;
  description?: string | null;
  image?: string | null;
  icon?: string | null;
  button_text?: string | null;
  button_link?: string | null;
  is_active?: boolean;
}
