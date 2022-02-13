import React from "react";
import features from "../../../assests/features.svg";
import TextCarousel from "./TextCarousel";
import {
  FeatureContainer,
  FeatureWrapper,
  FeatureRow,
  Column1,
  Column2,
  TextWrapper,
  TopLine,
  ImgWrap,
  Img,
} from "./FeatureComp";

const dta = {
  lightBg: false,
};

function Features() {
  return (
    <>
      <FeatureContainer lightBg={dta.lightBg} id="features">
        <FeatureWrapper>
          <FeatureRow>
            <Column1>
              <ImgWrap>
                <Img src={features} alt="Feature" />
              </ImgWrap>
            </Column1>
            <Column2>
              <TextWrapper>
                <TopLine>Features</TopLine>
                <TextCarousel />
                {/* <Heading>
                  We are the team Binary Brains,passionate about building
                  innovative softwares.
                </Heading> */}
              </TextWrapper>
            </Column2>
          </FeatureRow>
        </FeatureWrapper>
      </FeatureContainer>
    </>
  );
}

export default Features;
