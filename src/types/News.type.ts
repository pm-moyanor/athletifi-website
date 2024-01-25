export type NewsImage = {
  url: string;
};

export type Author = {
  fullName: string;
};

export type Category = {
  title: string;
};

export type NewsContent = {
  subheading: string;
  body: string;
};

export interface NewsArticle {
  id: number;
  title: string;
  description: string;
  slug: string;
  previewSummary: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: NewsImage;
  author: Author;
  content: NewsContent[];
  categories: Category[];
}

export interface NewsProps {
  newsListData: { data: NewsArticle[] };
}
