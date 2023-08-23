import Image from "next/image";
import React from "react";
import moment from "moment";

interface NewsProps {
  newsDetailData: string;
}
const MasteringGame: React.FC<NewsProps> = (props) => {
  const { newsDetailData } = props;

  return (
    <>
      {newsDetailData &&
        newsDetailData.data &&
        newsDetailData.data.map((newsItem: any, i: any) => {
          console.log("newsItemnewsItem", newsItem.attributes);
          const imagePath = "http://127.0.0.1:1337";
          const url =
            newsItem.attributes.image.data &&
            newsItem.attributes.image.data.attributes &&
            newsItem.attributes.image.data.attributes.url;
          const combinedUrl = url ? `${imagePath}${url}` : null;
          return (
            <>
              <section className="lg:pb-12 xl:pb-[117px] relative" key={i}>
                {/* GRID-LINE IMG */}
                <Image
                  className="lg:w-[462px] lg:h-[441px] w-40 lg:-top-28 lg:-left-10 absolute -z-20 opacity-50"
                  src="/assets/img/svg/news-grid-line.svg"
                  width={400}
                  height={448}
                  alt="grid-line"
                />
                <div className="container md:max-w-full xl:max-w-[1140px] 2xl:max-w-[1320px] mx-auto px-3 relative z-10">
                  <div className="xl:mt-[190px] lg:mt-[108px] md:mt-[60px] mt-[48px] relative z-20 before:content-[''] before:absolute before:w-[457px] before:h-[457px] before:-top-24 before:-left-40 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-z-10 before:rounded-full">
                    {
                      combinedUrl&&<Image
                      data-aos="zoom-in"
                      data-aos-duration="800"
                      data-aos-easing="linear"
                      data-aos-delay="200"
                      data-aos-offset="100"
                      src={combinedUrl}
                      width={1140}
                      height={556}
                      alt="players"
                      className="w-full h-full"
                    />
                    }
                    
                    <div className="lg:mt-12 md:mt-7 mt-5 relative z-20 before:content-[''] before:absolute before:w-[448px] before:h-[448px] before:-top-20 before:-end-60 before:bg-shadow_blue before:blur-[111px] before:opacity-25 before:-z-10 before:rounded-full">
                      <h3
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-easing="linear"
                        data-aos-delay="200"
                        data-aos-offset="200"
                        className="font-HelveticaNeueMedium text-primary font-medium text-[22px] sm:text-lg leading-8 md:leading-[39px] sm:text-start text-center"
                      >
                        {newsItem.attributes.text}
                      </h3>
                      <p
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-easing="linear"
                        data-aos-delay="200"
                        data-aos-offset="200"
                        className="font-Segoe text-offwhite mt-2 font-normal text-base sm:text-start text-center"
                      >
                        by: {newsItem.attributes.by} &bull;{" "}
                        {moment(newsItem.attributes.createdAt).format(
                          "DD MMM YY"
                        )}
                      </p>
                      <p
                        data-aos="fade-up"
                        data-aos-duration="800"
                        data-aos-easing="linear"
                        data-aos-delay="200"
                        data-aos-offset="200"
                        className="font-Segoe font-normal text-md lg:mt-4 mt-2 leading-7 text-offwhite sm:text-start text-center"
                      >
                        {newsItem.attributes.description}
                      </p>
                      {newsItem &&
                        newsItem.attributes.content.map(
                          (obj: any, index: any) => {
                            return (
                              <>
                                <h3
                                  key={index}
                                  data-aos="fade-up"
                                  data-aos-duration="800"
                                  data-aos-easing="linear"
                                  data-aos-delay="200"
                                  data-aos-offset="200"
                                  className="font-HelveticaNeueMedium text-primary font-medium text-[22px] mt-[20px] sm:mt-6 sm:text-lg leading-8 md:leading-[39px] sm:text-start text-center"
                                >
                                  {obj.title}
                                </h3>
                                <p
                                  data-aos="fade-up"
                                  data-aos-duration="800"
                                  data-aos-easing="linear"
                                  data-aos-delay="200"
                                  data-aos-offset="200"
                                  className="font-Segoe font-normal text-md lg:mt-[10px] mt-2 leading-7 text-offwhite sm:text-start text-center"
                                >
                                  {obj.description}
                                </p>
                              </>
                            );
                          }
                        )}
                    </div>
                  </div>
                </div>
              </section>
            </>
          );
        })}
    </>
  );
};

export default MasteringGame;
