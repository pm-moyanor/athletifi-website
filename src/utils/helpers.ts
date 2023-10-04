// import { NewsArticle } from "../types";
interface NewsArticle {
  id: number;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  image: Record<string, unknown>;
  author: Record<string, unknown>;
  categories: Record<string, unknown>[];
}

export function filterTargetArticle(allNewsData: { data: NewsArticle[] }, targetArticle: NewsArticle): NewsArticle[] {
  return allNewsData.data.filter((article) => article.slug !== targetArticle.slug);
}