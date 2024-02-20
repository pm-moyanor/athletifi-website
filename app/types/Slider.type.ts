interface ResponsiveSetting {
  breakpoint: number;
  settings: {
    slidesToScroll: number;
    slidesToShow: number;
  };
}

export interface SliderSettings {
  arrows: boolean;
  autoplay: boolean;
  autoplaySpeed: number;
  infinite: boolean;
  responsive: ResponsiveSetting[];
  slidesToScroll: number;
  slidesToShow: number;
  speed: number;
}
