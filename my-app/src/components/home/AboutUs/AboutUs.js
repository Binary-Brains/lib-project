import React from "react";
import aboutus from "../../../assests/aboutus.svg";

import {
  AboutContainer,
  AboutWrapper,
  AboutRow,
  Column1,
  Column2,
  TextWrapper,
  TopLine,
  Heading,
  ImgWrap,
  Img,
} from "./AboutUsComp";

const dta = {
  lightBg: false,
};

function AboutUs() {
  return (
    <>
      <AboutContainer lightBg={dta.lightBg} id="aboutus">
        <AboutWrapper>
          <AboutRow>
            <Column1>
              <TextWrapper>
                <TopLine>About Us</TopLine>
                <Heading>
                  We are the team Binary Brains,passionate about building
                  innovative softwares.
                </Heading>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={aboutus} alt="AboutUs" />
              </ImgWrap>
            </Column2>
          </AboutRow>
        </AboutWrapper>
      </AboutContainer>
    </>
  );
}

export default AboutUs;
