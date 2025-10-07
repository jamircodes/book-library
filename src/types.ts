export interface Book {
  key: string;
  title: string;
  author_name?: string | string[];
  cover_i?: number;
  first_publish_year?: number;
  read_url?: string;
  language?: string[]; // 👈 নতুন যোগ
  publisher?: string[]; // 👈 নতুন যোগ
}
