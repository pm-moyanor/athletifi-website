import React from 'react';

const SeasonHighlights: React.FC = () => {
  return (
    <div className=" flex flex-col w-auto md:w-1/2 md:mx-6 my-6 md:my-0  justify-start  md:items-start">
      <h2 className="text-[24px] md:text-lg text-primary font-semibold my-4 text-top">Season Highlights</h2>
      <p className="text-[16px] text-primary font-extralight max-w-[500px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates dolores sunt accusantium officiis, nesciunt nemo voluptatem alias, laboriosam nihil inventore odio dicta tempore tenetur itaque non numquam commodi hic labore. <span className=' block h-2'/> Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro molestias explicabo nobis incidunt error repudiandae dolor nostrum, dignissimos temporibus delectus quam at sed in cupiditate, harum optio beatae ex veniam? <span className=' block h-2'/>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse recusandae, commodi eveniet ipsa, reprehenderit asperiores sint corrupti ea natus ex nesciunt facilis? Vel maxime sapiente minima. Nesciunt similique ducimus et?</p>
    </div>
  );
};

export default SeasonHighlights;