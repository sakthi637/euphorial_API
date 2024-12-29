import React from "react";
import styled from "styled-components";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";

import img1 from "../assets/images/bg-1.jpg";
import img2 from "../assets/images/bg-2.jpg";
import img3 from "../assets/images/bg-3.jpg";

// Styled-components
const Section = styled.section`
  font-family: Causten;
  width: 100%;
  height: 100vh;
  margin: 0px auto 0;
`;

const ContentWrapper = styled.div`
  height: 90vh;
  background-size: cover;
  color: white;
  width: auto !important;

  div {
    padding: 180px 120px 0;
    text-align: start;
    display: inline-block;

    @media screen and (max-width: 1280px) {
      padding: 160px 120px 0;
    }

    @media screen and (max-width: 1080px) {
      padding: 160px 80px 0;
    }

    @media screen and (max-width: 840px) {
      padding: 160px 60px 0;
    }

  }
`;

const Category = styled.p`
  font-size: 32px;
  font-weight: 500;

  @media screen and (max-width: 1080px) {
    font-size: 28px;
  }

  @media screen and (max-width: 840px) {
    font-size: 24px;
  }


`;

const Title = styled.h1`
  font-size: 100px;
  margin-top: 30px;
  line-height: 100px;
  font-weight: 800;

  @media screen and (max-width: 1280px) {
    font-size: 90px;
    margin-top: 20px;
    line-height: 90px;
  }

  @media screen and (max-width: 1080px) {
    font-size: 70px;
    margin-top: 0px;
    line-height: 70px;
  }

  @media screen and (max-width: 840px) {
    font-size: 60px;
    line-height: 60px;
  }

`;

const Description = styled.p`
  font-size: 32px;
  margin-top: 25px;
  font-weight: 500;

  @media screen and (max-width: 1280px) {
    margin-top: 10px;
  }

  @media screen and (max-width: 1080px) {
    font-size: 28px;
  }

  @media screen and (max-width: 840px) {
    font-size: 24px;
  }

`;

const Button = styled.button`
  margin-top: 25px;
  padding: 16px 72px;
  background-color: white;
  color: #3c4242;
  border: none;
  border-radius: 4px;
  font-size: 24px;
  font-weight: 700;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #007bff;
    color: white;
  }

  @media screen and (max-width: 1080px) {
    padding: 13px 40px;
  }

  @media screen and (max-width: 840px) {
    padding: 12px 30px;
    font-size: 22px;
  }


`;

const slideImages = [
  {
    url: img1,
  },
  {
    url: img2,
  },
  {
    url: img3,
  },
];

export default function SlideShow() {
  return (
    <>
      <Section className="slide-container">
        <Slide indicators={true} duration={4000}>
          {slideImages.map((slideImage, index) => (
            <div key={index}>
              <ContentWrapper
                style={{ backgroundImage: `url(${slideImage.url})` }}
              >
                <div>
                  <Category>T-shirt / Tops</Category>
                  <Title>
                    Summer Value <br /> Pack
                  </Title>
                  <Description>cool / colorful / comfy</Description>
                  <Button>Shop Now</Button>
                </div>
              </ContentWrapper>
            </div>
          ))}
        </Slide>
      </Section>
    </>
  );
}
