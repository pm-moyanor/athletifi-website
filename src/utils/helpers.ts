// import { NewsArticle } from "../types";
interface newsArticle {
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

export function filterTargetArticle(
  allNewsData: { data: newsArticle[] },
  targetArticle: newsArticle
): newsArticle[] {
  return allNewsData.data.filter(
    article => article.slug !== targetArticle.slug
  );
}
