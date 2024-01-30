import Image from 'next/image';
import { BlueShadow, UnderLineText } from '../common/Icon';

const SHADOW_IMAGE_WIDTH: number = 500;
const SHADOW_IMAGE_HEIGHT: number = 500;
const AOS_DURATION: number = 400;
const AOS_DELAY: number = 100;
const AOS_OFFSET: number = 200;

const OurMission: React.FC = () => {
  return (
    <>
      <div className="relative py-6 lg:pt-10 sm:pt-20 pt-14">
        {/* SHADOW IMG */}
        <Image
          className="absolute top-30/100 -translate-y-24 end-0"
          src="/assets/img/png/what-we-do-shadow.png"
          width={SHADOW_IMAGE_WIDTH}
          height={SHADOW_IMAGE_HEIGHT}
          alt=""
        />
        <span className="absolute top-50 -start-10">
          <BlueShadow />
        </span>
        <div className="container md:max-w-full xl:max-w-1140 2xl:max-w-1320 mx-auto px-3 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="lg:w-1/2">
              <div
                data-aos="fade-up"
                data-aos-duration={AOS_DURATION}
                data-aos-easing="linear"
                data-aos-delay={AOS_DELAY}
                data-aos-offset={AOS_OFFSET}
                className="flex flex-col justify-center h-full lg:pe-6 xl:p-0 text-center lg:text-start lg:mt-14"
              >
                <h2 className="font-HelveticaNeueMedium font-medium text-lg md:text-5xl sm:text-4xl leading-60 text-primary md:mb-4">
                  <span className="relative">
                    Our Mission
                    <span className="absolute -bottom-5 left-0">
                      <UnderLineText />
                    </span>
                  </span>
                </h2>
                <p className="font-Segoe font-normal text-md md:max-w-530 text-primary mx-auto lg:ms-0 opacity-80 leading-7 sm:pt-4">
                  We are a sports technology company that are looking for ways
                  to increase engagement and bring the excitement of youth
                  soccer to a broader audience.
                </p>
                <p className="font-Segoe font-normal text-md md:max-w-530 text-primary mx-auto lg:ms-0 opacity-80 leading-7 sm:pt-4">
                  Our goal is to enrich the soccer experience, not only by
                  providing valuable insights into player performance but also
                  by fostering a deeper connection between young athletes, their
                  families, and the broader soccer community.
                </p>
                <p className="font-Segoe font-normal text-md md:max-w-530 text-primary mx-auto lg:ms-0 opacity-80 leading-7 sm:pt-4">
                  We understand that soccer is more than just a game; it&apos;s
                  a community. AthletiFi&apos;s platform encourages engagement
                  by providing a fun and informative way for families and
                  community members to connect with young athletes.
                </p>
              </div>
            </div>
            <div className="lg:w-5/12 w-9/12 sm:w-3/5 mx-auto lg:me-0 mt-8">
              <div
                data-aos="fade-up"
                data-aos-duration="400"
                data-aos-easing="linear"
                data-aos-delay="500"
                data-aos-offset="100"
                className="flex justify-center lg:justify-start"
              >
                <Image
                  src="/assets/img/webp/what-we-do-card-img.webp"
                  width={496}
                  height={603}
                  alt="Player card of Oscar Gasga from Villanova Soccer Academy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurMission;
