import React from 'react';

const SeasonHighlights: React.FC = () => {
  return (
    <div className=" flex flex-col w-auto md:w-1/2 md:mx-6 my-12 md:my-0 items-center md:items-start">
      <div className="">
        <h2 className=" text-[24px] md:text-lg text-primary font-[600] mb-4 text-top">
          Season Highlights
        </h2>
        <p className="text-[16px] text-primary font-extralight max-w-[450px] md:max-w-[400px] pr-0 md:pr-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates
          dolores sunt accusantium officiis, nesciunt nemo voluptatem alias,
          laboriosam nihil inventore odio dicta tempore tenetur itaque non
          numquam commodi hic labore. <span className=" block h-4" /> Lorem
          ipsum dolor sit amet consectetur adipisicing elit. Porro molestias
          explicabo nobis incidunt error repudiandae dolor nostrum, dignissimos
          temporibus delectus quam at sed in cupiditate, harum optio beatae ex
          veniam? <span className=" block h-4" />
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse
          recusandae, commodi eveniet ipsa Nesciunt similique ducimus et?{' '}
          <span className=" block h-4" /> Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Porro molestias explicabo nobis incidunt error
          repudiandae dolor nostrum
        </p>
      </div>
    </div>
  );
};

export default SeasonHighlights;
