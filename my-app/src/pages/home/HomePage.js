import React, { useState } from "react";
import AboutUs from "../../components/home/AboutUs/AboutUs";
import Carousel from "../../components/home/Carousel/Carousel";
import Features from "../../components/home/Features/Features";
import Footer from "../../components/home/Footer/Footer";
import HomeNav from "../../components/home/HomeNav/HomeNav";
import HomeSidebar from "../../components/home/HomeSidebar/HomeSidebar";
import Members from "../../components/home/Members/Members";

export default function HomePage() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <>
      <HomeSidebar isNavOpen={isNavOpen} toggle={toggle} />
      <HomeNav toggle={toggle} />
      {/* <Carousel /> */}
      <AboutUs />
      <Features />
      <Members />
      <Footer />
    </>
  );
}
