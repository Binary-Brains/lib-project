import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";
import { FeatureData } from "../../../data/FeatureData";

function TextCarousel() {
  return (
    <>
      <Swiper
        pagination={{
          type: "progressbar",
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        loop={true}
        className="swiper"
      >
        {FeatureData.map((item) => {
          return (
            <SwiperSlide key={item.id}>
              <h3 style={{ fontSize: "30px", color: "#fff" }}>{item.title}</h3>
              <p style={{ fontSize: "18px", color: "#fff" }}>{item.desc}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}

export default TextCarousel;
