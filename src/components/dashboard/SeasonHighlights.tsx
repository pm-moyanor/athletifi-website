import React from 'react';
import Skeleton from 'react-loading-skeleton';

const SeasonHighlights: React.FC<{ data: string[] | null[] }> = ({
  data,
}: {
  data: string[] | null[];
}) => {
  return (
    <>
      {data[0] ? (
        <div
          className="flex flex-col w-full md:w-1/2 mx-2 my-8 
    md:my-0 items-center md:items-start max-h-[460px]"
        >
          <div className="">
            <h2 className="text-[24px] md:text-lg text-primary font-[600] mb-4 text-top">
              Season Highlights
            </h2>
            <p className="text-[16px] text-primary font-extralight max-w-[560px] md:max-w-[440px] pr-2">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Voluptates dolores sunt accusantium officiis, nesciunt nemo
              voluptatem alias, laboriosam nihil inventore odio dicta tempore
              tenetur itaque non numquam commodi hic labore.{' '}
              <span className=" block h-2" /> Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Porro molestias explicabo nobis
              incidunt error repudiandae dolor nostrum, dignissimos temporibus
              delectus quam at sed in cupiditate, harum optio beatae ex veniam?{' '}
              <span className=" block h-2" />
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
              recusandae, commodi eveniet ipsa Nesciunt similique ducimus et?{' '}
              <span className=" block h-2" /> Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Porro molestias explicabo nobis
              incidunt error repudiandae dolor nostrum
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-[20px] md:mt-0 md:mr-[16px]">
          <Skeleton className="min-w-[343px] md:min-w-[340px] lg:min-w-[420px] min-h-[496px] md:min-h-[450px] lg:min-h-[455px]" />
        </div>
      )}
    </>
  );
};

export default SeasonHighlights;
