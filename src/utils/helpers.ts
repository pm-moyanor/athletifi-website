export type NewsImage = Readonly<{
  url: string;
}>;

export type Author = Readonly<{
  fullName: string;
}>;

export type Category = Readonly<{
  title: string;
}>;

export type NewsContent = Readonly<{
  subheading: string;
  body: string;
}>;

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

export function filterTargetArticle(
  allNewsData: { data: NewsArticle[] },
  targetArticle: NewsArticle | null
): NewsArticle[] {
  return allNewsData.data.filter(
    article => article.slug !== targetArticle.slug
  );
}
