import React from "react";
import styled from "styled-components";

import img1 from "../assets/images/bg-4.jpg";
import img2 from "../assets/images/bg-5.jpg";

const App = () => (
  <Section>
    <ImageContainer>
      <ImageDiv1>
        <Heading>WE MADE YOUR EVERYDAY FASHION BETTER!</Heading>
        <Paragraph>
          In our journey to improve everyday fashion, euphoria presents EVERYDAY
          wear range - Comfortable & Affordable fashion 24/7
        </Paragraph>
        <Links to="">Shop Now</Links>
      </ImageDiv1>
      <ImageDiv2>
        <Imgeb src={img2} />
      </ImageDiv2>
    </ImageContainer>
  </Section>
);

export default App;

const Section = styled.section`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  margin: 100px auto 0;

  
`;

const ImageDiv1 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-image: url(${img1});
  background-size: cover;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  width: 90.1%;
  height: 600px;
  overflow: hidden;
  color: #fff;
  padding: 0 5%;
  text-align: start;

  @media (max-width: 800px) {
    height: 500px;
  }
  @media (max-width: 940px) {
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom-left-radius: 0;
    height: 450px;
  }
  @media (max-width: 400px) {
    height: 350px;
  }
  @media (max-width: 350px) {
    height: 300px;
  }
`;

// Heading style (h1)
const Heading = styled.h2`
  font-size: 2rem;
  padding-bottom: 1.5rem;
  @media (max-width: 800px) {
    font-size: 1.4rem;
  }
  @media (max-width: 600px) {
    font-size: 1.2rem;
  }

  @media (max-width: 400px) {
    font-size: 0.9rem;
    padding-bottom: 1rem;
  }
`;

const Paragraph = styled.p`
  width: 451px;
  font-size: 20px;
  font-weight: 300;
  line-height: 1.6;
  margin-top: 20px;
  text-align: start;

  @media (max-width: 800px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 0.8rem;
  }
  @media (max-width: 400px) {
    font-size: 0.5rem;
    padding-bottom: 1rem;
  }
`;

const Links = styled.button`
  font-size: 18px;
  margin-top: 25px;
  padding: 12px 44px;
  background-color: #fff;
  border-radius: 12px;
  width: fit-content;

  &:hover {
    text-decoration: underline;
  }

  @media (max-width: 600px) {
    font-size: 0.7rem;
  }
  @media (max-width: 400px) {
    font-weight: 600;
    font-size: 0.5rem;
    padding: 2% 4%;
  }
`;

const ImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  width: 100%;

  @media (max-width: 940px) {
    flex-direction: column;
  }
`;

const ImageDiv2 = styled.div`
  width: 100%;
  height: 600px;
  @media (max-width: 800px) {
    height: 500px;
  }
  @media (max-width: 700px) {
    height: 500px;
  }
  @media (max-width: 400px) {
    height: 350px;
  }
  @media (max-width: 350px) {
    height: 300px;
  }
`;

const Imgeb = styled.img`
  width: 100%;
  height: 600px;
  @media (max-width: 800px) {
    height: 500px;
  
  }

  @media (max-width: 940px) {
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;
  }

  @media (max-width: 700px) {
    height: 500px;
  }
  @media (max-width: 400px) {
    height: 350px;
  }
  @media (max-width: 350px) {
    height: 300px;
  }
`;
