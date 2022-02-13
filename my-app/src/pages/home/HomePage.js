import React from "react";
import AboutUs from "../../components/home/AboutUs";
import Features from "../../components/home/Features";
import Footer from "../../components/home/Footer";
import HomeNavbar from "../../components/home/Navbar";

export default function HomePage() {
  return (
    <>
      <HomeNavbar />
      <AboutUs />
      <Features />
      <Footer />
    </>
  );
}
