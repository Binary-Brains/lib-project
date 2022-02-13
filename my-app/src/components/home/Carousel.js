import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { makeStyles } from "@material-ui/core/styles";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper";

const useStyles = makeStyles(() => ({
  slidess: {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
}));

// const swiper = new Swiper(".swiper", {
//   // Optional parameters
//   direction: "vertical",
//   loop: true,

//   // If we need pagination
//   pagination: {
//     el: ".swiper-pagination",
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: ".swiper-button-next",
//     prevEl: ".swiper-button-prev",
//   },

//   // And if we need scrollbar
//   scrollbar: {
//     el: ".swiper-scrollbar",
//   },
// });

export default function Carousel({ data }) {
  const classes = useStyles();
  return (
    <>
      <Swiper pagination={true} modules={[Pagination]}>
        {data.map((item) => {
          return (
            <SwiperSlide>
              <h1>{item.title}</h1>
              <p>{item.desc}</p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </>
  );
}
