import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination } from "swiper";

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
        <SwiperSlide>
          <h3 style={{ fontSize: "30px", color: "#fff" }}>
            Catalog management
          </h3>
          <p style={{ fontSize: "18px", color: "#fff" }}>
            To digitally keep track of what is available in the library. The
            books will be catalogued by title, subject, author and date of
            publishing.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h3 style={{ fontSize: "30px", color: "#fff" }}>
            Membership management
          </h3>
          <p style={{ fontSize: "18px", color: "#fff" }}>
            To maintain a detailed database of the members. The system records
            the name, ID and password of each user. The system helps in
            ascertaining the track record of the member.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h3 style={{ fontSize: "30px", color: "#fff" }}>Search function</h3>
          <p style={{ fontSize: "18px", color: "#fff" }}>
            To enable both the librarian and the members to search the catalog
            of books in the library. The search functions can be filtered to the
            need of each user.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h3 style={{ fontSize: "30px", color: "#fff" }}>Self management</h3>
          <p style={{ fontSize: "18px", color: "#fff" }}>
            To check in and check out books by oneself. The library management
            system software of digital libraries allows the members to login,
            search, select, issue and return books by themselves.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h3 style={{ fontSize: "30px", color: "#fff" }}>Fine Management</h3>
          <p style={{ fontSize: "18px", color: "#fff" }}>
            Keep track of all the fines that are pending for the books submitted
            lately to the library.
          </p>
        </SwiperSlide>
        <SwiperSlide>
          <h3 style={{ fontSize: "30px", color: "#fff" }}>Notifications</h3>
          <p style={{ fontSize: "18px", color: "#fff" }}>
            Get the alert before the due date of the book so that you didn’t
            miss the deadline and will be safe from the fine.
          </p>
        </SwiperSlide>
      </Swiper>
    </>
  );
}

export default TextCarousel;
