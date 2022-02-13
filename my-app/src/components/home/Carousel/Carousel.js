// import React from "react";
// import "./Carousel.css";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/pagination";
// import "swiper/css/navigation";
// import { Autoplay } from "swiper";

// const content = [
//   {
//     id: 1,
//     img: require("../../../assests/lib1.jpg"),
//     title: "A library is a hospital for the mind.",
//   },
//   {
//     id: 2,
//     img: require("../../../assests/lib2.jpg"),
//     title: "I never went to the college so I went to the library.",
//   },
//   {
//     id: 3,
//     img: require("../../../assests/lib3.jpg"),
//     title: "There is no friend as loyal as the book.",
//   },
//   {
//     id: 4,
//     img: require("../../../assests/lib4.jpg"),
//     title: "A library is not a luxury but one of the necessities.",
//   },
// ];

// function Carousel() {
//   return (
//     <Swiper
//       spaceBetween={30}
//       autoplay={{
//         delay: 5000,
//         disableOnInteraction: false,
//       }}
//       modules={[Autoplay]}
//       loop={true}
//       className="mySwiper"
//     >
//       {content.map((item) => {
//         return (
//           <SwiperSlide>
//             <img src={item.img} />
//             <div className="carouselCentered">
//               <h1 className="carouselHeading">{item.title}</h1>
//             </div>
//           </SwiperSlide>
//         );
//       })}
//     </Swiper>
//   );
// }

// export default Carousel;
