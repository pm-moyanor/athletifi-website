
// ALL NEWS LIST API URL
export const NewsListApiHandler=()=>{
    return `/news-lists?populate=image`;
}
// FILTER NEWS LIST API URL
export const NewsListFilterApiHandler=()=>{
    return `/news-lists?populate=image&filters[isLatest][$eq]=true`;
}

// NEWS DETAIL API URL
export const NewsDetailApiHandler=(slug:any)=>{
    return `/news-lists/?populate=image&populate=content&filters[slug][$eq]=${slug}`;
}

// POST CREATE API
export const PostNewsLetterHandler=()=>{
    return `/join-newsletters`;
}