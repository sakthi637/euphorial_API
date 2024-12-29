import React from "react";
import styled from "styled-components";

export default function BrandsScreen() {
  return (
    <Section>
      <Header>
        <h1>Top Brands Deal</h1>
        <p>
          Up To <span>60%</span> off on brands
        </p>
      </Header>
      <BrandList>
        <ul>
          <li>
            <img src={require("../assets/images/nike.jpg")} alt="brand_" />
          </li>
          <li>
            <img src={require("../assets/images/H&M.jpg")} alt="brand_" />
          </li>
          <li>
            <img src={require("../assets/images/levis.jpg")} alt="brand_" />
          </li>
          <li>
            <img src={require("../assets/images/USPA.jpg")} alt="brand_" />
          </li>
          <li>
            <img src={require("../assets/images/puma.jpg")} alt="brand_" />
          </li>
        </ul>
      </BrandList>
    </Section>
  );
}

// Styled Components
const Section = styled.section`
  padding: 3rem 0.5rem;
  background-color: #323232;
  width: 80%;
  margin: 100px auto 0;
  border-radius: 12px;
`;

const Header = styled.div`
  text-align: center;

  h1 {
    font-size: 50px;
    font-weight: 800;
    color: #fff;
    line-height: 49px;
    margin-top: 25px;
  }

  p {
    font-size: 22px;
    font-weight: 400;
    color: #fff;
    margin-top: 40px;
    span {
      color: #FBD103;
      font-weight: 700;
    }
  }
`;

const BrandList = styled.div`
  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
    list-style-type: none;
    gap: 20px;
    padding: 0;
    margin-top: 65px;
  }

  li {
    min-width: 160px;
    max-width: 175px;
    min-height: 77px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    align-content: center;
    border-radius: 12px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: scale(1.1);
      }
    img {
      width: 100%;
      height: auto;
      border-radius: 5px;
      transition: transform 0.3s ease;
    }
  }
`;
