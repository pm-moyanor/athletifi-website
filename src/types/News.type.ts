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

export interface PaginatedWorkflow {
  meta: {
    pagination: {
      page: number;
      pageCount: number;
      pageSize: number;
      total: number;
    };
  };
  data: NewsArticle[];
}

export interface Articles {
  newsListData?: NewsArticle[];
}

export interface AllArticles {
  allNewsList: NewsArticle[] | null;
}

export interface NewsProps extends Articles {
  allNewsList: PaginatedWorkflow;
}

export interface NewsDetails {
  newsDetailData: PaginatedWorkflow;
}

export interface NewsSlugProps extends NewsDetails {
  allNewsData: PaginatedWorkflow;
}
