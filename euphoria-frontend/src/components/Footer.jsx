import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";




export default function Footer() {
  return (
    <>
      <FooterSection>
        <TopDiv>
          <FooterUl>
            <h3>Need Help</h3>
            <FooterLi>
              <FooterA>Contact Us</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>Track Order</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>Return & Refunds</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>FAQ's</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>Career</FooterA>
            </FooterLi>
          </FooterUl>

          <FooterUl>
            <h3>Company</h3>
            <FooterLi>
              <FooterA>About Us</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>euphoria Blog</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>euphoriastan</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>Collaboration</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>Media</FooterA>
            </FooterLi>
          </FooterUl>

          <FooterUl>
            <h3>More info</h3>
            <FooterLi>
              <FooterA>terms and Conditions</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>Privacy Policy</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>Shipping Policy</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>Sitemap</FooterA>
            </FooterLi>
          </FooterUl>

          <FooterUl>
            <h3>Location</h3>
            <FooterLi>
              <FooterA>support@euphoria.in Us</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>Eklingpura Chouraha, Ahmedabad Main Road</FooterA>
            </FooterLi>
            <FooterLi>
              <FooterA>
                (NH 8- Near Mahadev Hotel) Udaipur, India- 313002
              </FooterA>
            </FooterLi>
          </FooterUl>
        </TopDiv>

        <IconDiv>
          <IconUl>
            <IconLi>
              <Image src={require("../assets/icons/facebook.svg").default} />
            </IconLi>
            <IconLi>
              <Image src={require("../assets/icons/instagram.svg").default} />
            </IconLi>
            <IconLi>
              <Image src={require("../assets/icons/twitter.svg").default} />
            </IconLi>
            <IconLi>
              <Image src={require("../assets/icons/linkedin.svg").default} />
            </IconLi>
          </IconUl>
          <Appdiv>
            <h3>Download The App</h3>
            <Appstorediv>
              <Appli>
                <Image src={require("../assets/icons/playstore.svg").default} />
                <h5>
                  android app on <br /> <span> Google Play</span>
                </h5>
              </Appli>
              <Appli>
                <Image src={require("../assets/icons/phone.svg").default} />
                <h5>
                  availiable on the <br /> <span> App Store </span>
                </h5>
              </Appli>
            </Appstorediv>
          </Appdiv>
        </IconDiv>

        <PopCat>
          <CatText>Popular Categories</CatText>
          <Image src={require("../assets/icons/arrow-down.svg").default} />
        </PopCat>

        <CopyRightA>
          <Link href="#">
            Copyright © 2023 Euphoria Folks Pvt Ltd. All rights reserved.
          </Link>
        </CopyRightA>
      </FooterSection>
    </>
  );
}

const FooterSection = styled.section`
  background: #3c4242;
  width: 100%;
  margin: 100px auto 0px;
  color: #fff;
`;
const TopDiv = styled.div`
  width: 90%;
  margin: 10px auto;
  padding-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 0px;

  @media screen and (max-width: 980px) {
    justify-content: space-evenly;
    gap: 10px 0;
  }


`;

const IconDiv = styled.div`
  width: 75%;
  min-height: 140px;
  margin: 30px auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;


  @media screen and (min-width: 768px) and (max-width: 1080px) {
    width: 85%;
  }

  @media screen and (max-width: 768px) {
    justify-content: space-between;
    width: 75%;

  }

`;

const Appdiv = styled.div`
  display: flex;
  flex-direction: column;
  font-family: Causten;
`;

const Appstorediv = styled.ul`
  display: flex;
  gap: 10px;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    gap: 25px;
  
  }

`;
const FooterUl = styled.ul`
  h3 {
    font-size: 22px;
    font-weight: 700;
    line-height: 2;
  }
`;
const FooterLi = styled.li`
  font-size: 16px;
  font-weight: 500;
  line-height: 2;
`;
const IconUl = styled.ul`
  display: flex;
  width: 20%;
  justify-content: space-evenly;

  @media screen and (max-width: 768px) {
    gap: 10px;
    flex-direction: column;
    
  }
`;
const IconLi = styled.li`
  background-color: #fff;
  padding: 10px;
  border-radius: 10px;
  text-align: center;
  align-content: center;
`;

const Appli = styled.li`
  display: flex;
  align-items: center;
  justify-content: start;
  margin-top: 10px;
  gap: 10px;
  background: #404040;
  border-radius: 10px;
  padding: 10px;

  h5 {

  }
  span {
    font-size: 20px;

    @media screen and (max-width: 980px) {
      font-size: 18px;
    }
  }
`;
const Image = styled.img``;
const FooterA = styled.a`
  text-decoration: none;
`;

const CopyRightA = styled.div`
  text-align: center;
  align-content: center;
  margin: 10px auto;
  min-height: 100px;

  a {
    text-decoration: none;
    color: #fff;
  }
`;

const PopCat = styled.div`
  margin: 40px auto 0;
  display: flex;
  justify-content: space-around;
  gap: 900px;
  align-items: center;
  width: 78%;
  min-height: 100px;
  border-top: 1px solid#BEBCBD;
  border-bottom: 1px solid#BEBCBD;

  @media screen and (min-width: 768px) and (max-width: 1280px) {
    gap: 650px;   
  }
  
  @media screen and (max-width: 1080px) {
    width: 88%;
    gap: 600px;
  }

  @media screen and (max-width: 768px) {
    width: 78%;
    gap: 400px;
  }

  @media screen and (max-width: 648px) {
    gap: 300px;
  }

  @media screen and (max-width: 460px) {
    gap: 200px;
  }

`;
const CatText = styled.h2`
  font-family: Causten;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }

  @media screen and (max-width: 648px) {
    font-size: 18px;
  }

`;
