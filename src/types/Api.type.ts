import { PaginatedWorkflow } from '@/types/News.type';
export interface NewsApiResponse {
  res: PaginatedWorkflow;
  error: string | null | undefined;
}

export interface NewsListResult {
  allNewsList: PaginatedWorkflow | null;
  allNewsListError: string | null | undefined;
}

export type PostData<T> = {
  data: T;
};
