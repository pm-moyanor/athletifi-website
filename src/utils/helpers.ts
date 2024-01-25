import { NewsArticle } from '@/types/News.type';

export function filterTargetArticle(
  allNewsData: { data: NewsArticle[] },
  targetArticle: NewsArticle
): NewsArticle[] {
  return allNewsData.data.filter(
    article => article.slug !== targetArticle.slug
  );
}
