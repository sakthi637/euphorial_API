import React from "react";
import styled from "styled-components";

import img1 from "../assets/images/bg-2.jpg";
import img2 from "../assets/images/bg-3.jpg";
import { Link } from "react-router-dom";

export default function OfferSec() {
  return (
    <Section>
      <Div>
          <Paragraph>Low Price</Paragraph>
          <Heading>High Coziness</Heading>
          <Paragraph1>UPTO 50% OFF</Paragraph1>
          <Anchor>Explore Items</Anchor>
      </Div>
      <Div1>
          <Paragraph>Beyoung presents</Paragraph>
          <Heading>Breezy Summer Style</Heading>
          <Paragraph1>UPTO 50% OFF</Paragraph1>
          <Anchor>Explore Items</Anchor>
      </Div1>
    </Section>
  );
}

const Section = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 70px;
  width: 80%;
  margin: 100px auto 0;

  @media (max-width: 900px) {
    flex-wrap: wrap;
    justify-content: center;
  }


`;

const Div = styled.div`
 display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  width: 50%;
  height: 400px;
  overflow: hidden;
  background-image: url(${img2});
  background-size: 150% 200%;
  background-position: top left;
  border-radius: 5px;
  padding: 0 4%;
  color: white;
  @media (max-width: 900px) {
    width: 60%;
  }
  @media (max-width: 800px) {
    width: 75%;
  }
  @media (max-width: 600px) {
    width: 80%;
  }
  @media (max-width: 500px) {
    width: 90%;
  }
  @media (max-width: 375px) {
    width: 100%;
  }

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }


`;
const Div1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  justify-content: center;
  width: 50%;
  height: 400px;
  background-size: 150% 180%;
  background-position: top left;
  background-image: url(${img1});
  border-radius: 5px;
  padding: 0 4%;
  color: white;
  @media (max-width: 900px) {
    width: 60%;
  }
  @media (max-width: 800px) {
    width: 75%;
  }
  @media (max-width: 600px) {
    width: 80%;
  }
  @media (max-width: 500px) {
    width: 90%;
  }
  @media (max-width: 375px) {
    width: 100%;
  }

  &:hover {
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }



`;

const Paragraph = styled.p`
  font-size: 16px;
  font-weight: 800;
  color: #555;
  margin-top: 15px;
`;
const Paragraph1 = styled.p`
  font-size: 16px;
  font-weight: 800;
  color: #555;
  margin-top: 15px;
`;

const Heading = styled.h1`
  font-size: 34px;
  font-weight: 800;
  color: #333;
  margin-top: 24px;
`;

const Anchor = styled(Link)`
  display: inline-block;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-size: 20px;
  font-weight: 800;
  margin-top: 15px;

  &:hover {
    text-decoration: underline;
  }
`;
