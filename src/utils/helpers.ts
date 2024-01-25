import { NewsArticle } from '@/types/News.type';

export function filterTargetArticle(
  allNewsData: NewsArticle[],
  targetArticle: NewsArticle | null
): NewsArticle[] {
  return targetArticle
    ? allNewsData.filter(article => article.slug !== targetArticle.slug)
    : allNewsData;
}
