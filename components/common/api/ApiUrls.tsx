
// ALL NEWS LIST API URL
// Function to construct the API URL for fetching a list of news articles from the Strapi CMS.
// The URL includes query parameters to populate related fields and sort the articles by creation date.
export const NewsListApiHandler=()=>{
    return `/news-lists?populate=image&populate=author&populate=categories&sort=createdAt:desc`;
}
// FILTER NEWS LIST API URL
export const NewsListFilterApiHandler=()=>{
    return `/news-lists?populate=image&populate=author&populate=categories&sort=createdAt:desc`;
}

// NEWS DETAIL API URL
// Function to construct the API URL for fetching details of a specific news article from the Strapi CMS.
// Slug: The unique identifier (slug) for the news article.
export const NewsDetailApiHandler=(slug:any)=>{
    return `/news-lists/?populate=image&populate=content&filters[slug][$eq]=${slug}&populate=author`;
}

// POST CREATE API
// Function to construct the API URL for posting to newsletters in the Strapi CMS.
export const PostNewsLetterHandler=()=>{
    return `/join-newsletters`;
}