import React from "react";
import styled from "styled-components";

export default function Feedback() {
  return (
    <SectionWrapper>
      <Container>
        <Hr />
        <Title>Feed back</Title>
      </Container>
      <Section>
        <ReviewContainer>
          <div>
            <Profile>
              <ProfileImage
                src={require("../assets/icons/span-1.svg").default}
                alt="Floyd Miles"
              />
              <Name>Floyd Miles</Name>
            </Profile>
            <Rating src="" alt="Ratings star" />
          </div>
          <ReviewText>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </ReviewText>
        </ReviewContainer>

        <ReviewContainer>
          <div>
            <Profile>
              <ProfileImage
                src={require("../assets/icons/span-2.svg").default}
                alt="Floyd Miles"
              />
              <Name>Floyd Miles</Name>
            </Profile>
            <Rating src="" alt="Ratings star" />
          </div>
          <ReviewText>
            Ullamco est sit aliqua dolor do amet sint. Velit officia consequat
            duis enim velit mollit. Exercitation veniam consequat sunt nostrud
            amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </ReviewText>
        </ReviewContainer>

        <ReviewContainer>
          <div>
            <Profile>
              <ProfileImage
                src={require("../assets/icons/span-3.svg").default}
                alt="Floyd Miles"
              />
              <Name>Floyd Miles</Name>
            </Profile>
            <Rating src="" alt="Ratings star" />
          </div>
          <ReviewText>
            Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet
            sint. Velit officia consequat duis enim velit mollit. Exercitation
            veniam consequat sunt nostrud amet.
          </ReviewText>
        </ReviewContainer>
      </Section>
    </SectionWrapper>
  );
}

// Container for the section
const SectionWrapper = styled.section`
  width: 80%;
  margin: 100px auto 0;
`;

const Section = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  gap: 20px;
  margin: 50px auto 0;

  @media screen and (max-width: 780px) {
    justify-content: center ;
  }

`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
`;

const Hr = styled.hr`
  width: 10px;
  height: 40px;
  border: 0;
  border-radius: 10px;
  background-color: #8a33fd;
`;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 600;
  color: #333;
`;

const ReviewContainer = styled.div`
  // min-width: 400px;
  max-width: 450px;
  height:300px;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;

  div {
    display: flex;
    justify-content: space-between;
  }
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
`;

const Name = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #333;
`;

const Rating = styled.img`
  width: 100px;
  height: 20px;
  object-fit: contain;
`;

const ReviewText = styled.p`
  font-size: 14px;
  color: #555;
  line-height: 1.6;
  margin-top: 10px;
`;