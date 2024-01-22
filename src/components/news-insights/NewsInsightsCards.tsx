import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { PaginationArrow } from '../common/Icon';
import Skeleton from 'react-loading-skeleton';
import NewsInsightsLoader from './NewsInsightsLoader';
import { GetRequestHandler } from '../common/api/Api';
import { NewsListApiHandler } from '../common/api/ApiUrls';
import { log } from 'console';

const IMAGE_WIDTH = 315;
const IMAGE_HEIGHT = 240;
const AOS_DURATION = 400;
const AOS_DELAY = 100;
const AOS_OFFSET = 200;
const IMAGE_WIDTH_GRID = 716;
const IMAGE_HEIGHT_GRID = 692;

interface NewsListProps {
  allNewsList: any;
}

const NewsInsightsCards: React.FC<NewsListProps> = props => {
  // ==== SKELETON LOADER START ====
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  // ==== SKELETON LOADER END ====
  const router = useRouter();
  const moreArticles = props.allNewsList ?? [];
  // Nullish coalescing (??) is used to ensure that moreArticles is always an array, even if props.allNewsList is undefined or null.

  const itemsPerPage = 5; //change this to change the number of articles displayed on one page
  const [currentPage, setCurrentPage] = useState(Number(router.query.page));
  // Calculate the start and end indexes of the current page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedItems = moreArticles.slice(startIndex, endIndex);
  const totalPages = Math.ceil(moreArticles.length / itemsPerPage) || 1;

  const handlePageChange = async (newPage: any) => {
    setLoading(true);
    try {
      const response = await GetRequestHandler(NewsListApiHandler());
      setLoading(false);
      setCurrentPage(newPage);
    } catch (error) {
      console.log('error');
    }
  };

  return (
    <div className="py-14 md:py-0 relative before:content-[''] before:absolute sm:before:w-448 before:w-248 sm:before:h-448 before:h-248 before:top-0 before:left-0 before:bg-shadow_blue before:blur-111 before:opacity-25 before:-translate-x-1/4 before:z-0 before:rounded-full after:content-[''] after:absolute sm:after:w-448 sm:after:h-448 after:w-248 after:h-248 after:bottom-20 after:right-0 after:bg-shadow_blue after:blur-111 after:opacity-25 after:translate-x-1/4 after:z-0 after:rounded-full">
      <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto relative z-10 md:mb-100 xl:mb-160">
        <h2
          data-aos="fade-up"
          data-aos-duration={AOS_DURATION}
          data-aos-easing="linear"
          data-aos-delay={AOS_DELAY}
          data-aos-offset={AOS_OFFSET}
          className="text-center md:text-start font-HelveticaNeueMedium font-medium text-lg md:text-5xl sm:text-4xl text-primary md:pt-10 md:pb-25 pb-5"
        >
          <span className="relative">
            More Recent News
          </span>
        </h2>

        {/*  <NewsInsightsLoader/>  */}
        {moreArticles.length === 0 ? (
          <p className="text-center text-gray-500">
            This is the only article right now. Check back later for new
            Articles!
          </p>
        ) : (
          <div>
            {displayedItems.map((item: any, index: any) => {
              // console.log("WHAT IS THIS",item)
              const imagePath = 'https://vidalco.in';
              const url = item.image.url;
              const combinedUrl = url ? `${imagePath}${url}` : null;

              return (
                // <>
                <div key={item.slug}>
                  {loading ? (
                    <NewsInsightsLoader />
                  ) : (
                    <Link
                      // href={`/news/${item.slug}?page=${currentPage}`}
                      href={`/news/${item.slug}?page=1`}
                      passHref
                    >
                      <div
                        key={index}
                        className="flex md:flex-row flex-col lg:p-8 p-6 bg-darkgray lg:gap-x-12 sm:gap-7 gap-3 rounded-20 mb-6 sm:mt-30pixel"
                        data-aos="fade-up"
                        data-aos-duration={AOS_DURATION}
                        data-aos-easing="ease"
                        data-aos-delay={item.delay}
                      >
                        {combinedUrl && (
                          <Image
                            className="lg:w-315 h-200 375:h-300 500:h-400 md:h-150 lg:!h-220 rounded-10 object-cover w-full md:min-w-225 lg:min-w-315 md:w-224"
                            src={combinedUrl}
                            width={IMAGE_WIDTH}
                            height={IMAGE_HEIGHT}
                            alt="football match"
                          />
                        )}
                        <div className="sm:pt-0 pt-3 max-w-617">
                          {/* NEWS HEADING */}
                          <h3 className="sm:text-basemd text-md text-primary font-HelveticaNeueMedium leading-140">
                            {item.title}
                          </h3>
                          <div className="flex sm:items-center sm:flex-row flex-col sm:gap-3 gap-2 pt-2">
                            <h4 className="lg:pe-3 ">
                              <span className="lg:text-md text-base text-primary font-Segoe opacity-80 font-normal lg:pe-2 pe-1">
                                by :
                              </span>
                              <span className="lg:text-base text-sm text-primary font-Segoe font-semibold">
                                {item.author.fullName}
                              </span>
                            </h4>
                            {/* NEWS CATEGORY */}
                            <span className="flex gap-x-3">
                              {item.categories.map((val: any, i: any) => {
                                return (
                                  <button
                                    key={i}
                                    className="lg:text-base md:text-xxs text-sm text-skyblue font-Segoe font-normal py-2 px-3 sm:py-10pixel sm:px-18pixel bg-matchtitles rounded-full leading-150 duration-300 hover:text-white"
                                  >
                                    {val.title}
                                  </button>
                                );
                              })}
                            </span>
                          </div>
                          {/* NEWS DATA */}
                          <p className="sm:text-md text:base text-primary opacity-80 font-Segoe leading-150 sm:pt-4 pt-3 lg:pe-14 sm:pe-4">
                            {item.previewSummary}
                          </p>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
                // </>
              );
            })}

            <div className="flex justify-between lg:max-w-210 py-3  max-w-230 mx-auto bg-darkgray rounded-full lg:px-8 px-6 items-center scrollmodify">
              {currentPage === 1 ? (
                <div className="opacity-70 -rotate-90 cursor-not-allowed inline-block">
                  <PaginationArrow />
                </div>
              ) : (
                <Link
                  scroll={false}
                  href={
                    router.pathname === '/news'
                      ? `/news?page=${currentPage - 1}`
                      : `/news/${router.query.slug}?page=${currentPage - 1}`
                  }
                  onClick={() => handlePageChange(currentPage - 1)}
                  className="-rotate-90 hover:-translate-x-1 duration-200 inline-block"
                >
                  <PaginationArrow />
                </Link>
              )}

              <div className="text-white">
                <span>{currentPage}</span>
                <span className="text-white px-3">of</span>
                <span>{totalPages}</span>
              </div>
              {currentPage === totalPages ? (
                <div className="opacity-70 rotate-90 cursor-not-allowed inline-block">
                  <PaginationArrow />
                </div>
              ) : (
                <Link
                  scroll={false}
                  onClick={() => handlePageChange(currentPage + 1)}
                  href={
                    router.pathname === '/news'
                      ? `/news?page=${currentPage + 1}`
                      : `/news/${router.query.slug}?page=${currentPage + 1}`
                  }
                  className=" rotate-90 hover:translate-x-1 duration-200"
                >
                  <PaginationArrow />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
      {/* BACKGROUND RIGHT GRID */}
      <Image
        className="xl:w-600 lg:w-550 sm:w-400 w-250 absolute bottom-10 right--50 -z-10"
        src="/assets/img/svg/grid-lines.svg"
        width={IMAGE_WIDTH_GRID}
        height={IMAGE_HEIGHT_GRID}
        alt={'grid image'}
      />
      {/* BACKGROUND LEFT GRID */}
      <Image
        className="xl:w-600 lg:550 sm:w-400 w-250 absolute top-40 -translate-y-1/3 left-2 -z-10"
        src="/assets/img/svg/grid-lines.svg"
        width={IMAGE_WIDTH_GRID}
        height={IMAGE_HEIGHT_GRID}
        alt={'grid image'}
      />
    </div>
  );
};

export default NewsInsightsCards;
