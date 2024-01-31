export type ContactUs = {
  name: string;
  email: string;
  message: string;
};

export type PostContactUs<T> = {
  name: T;
  email: T;
  message: T;
};
