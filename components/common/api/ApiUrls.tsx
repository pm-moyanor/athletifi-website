
// ALL NEWS LIST API URL
export const NewsListApiHandler=()=>{
    return `/news-lists?populate=image&populate=author&populate=categories`;
}
// FILTER NEWS LIST API URL
export const NewsListFilterApiHandler=()=>{
    return `/news-lists?populate=image&filters[isLatest][$eq]=true&populate=author&populate=categories`;
}

// NEWS DETAIL API URL
export const NewsDetailApiHandler=(slug:any)=>{
    return `/news-lists/?populate=image&populate=content&filters[slug][$eq]=${slug}&populate=author`;
}

// POST CREATE API
export const PostNewsLetterHandler=()=>{
    return `/join-newsletters`;
}