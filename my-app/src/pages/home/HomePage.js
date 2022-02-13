import React, { useState } from "react";
import AboutUs from "../../components/home/AboutUs/AboutUs";
import Features from "../../components/home/Features/Features";
import Footer from "../../components/home/Footer/Footer";
import HomeNav from "../../components/home/HomeNav/HomeNav";
import HomeSidebar from "../../components/home/HomeSidebar/HomeSidebar";
import Members from "../../components/home/Members/Members";
import VideoComp from "../../components/home/VideoComp/VideoComp";

export default function HomePage() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const toggle = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <>
      <HomeSidebar isNavOpen={isNavOpen} toggle={toggle} />
      <HomeNav toggle={toggle} />
      <VideoComp />
      <AboutUs />
      <Features />
      <Members />
      <Footer />
    </>
  );
}
