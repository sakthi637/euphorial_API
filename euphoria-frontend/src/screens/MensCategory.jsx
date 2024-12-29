import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DataContext } from "../services/ProductApi";
import { useNavigate } from "react-router-dom";

const MensCategory = () => {
  const navigate = useNavigate();
  const context = useContext(DataContext);
  const [menCollections, setMenCollections] = useState([]);

  const { data = [], loading, error } = context;

  useEffect(() => {
    if (Array.isArray(data)) {
      const filteredProduct = data.filter((product) =>
        product.category.includes("mens collections")
      );
      setMenCollections(filteredProduct);
    }
  }, [data]);

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Section>
      <Container>
        <Hr />
        <Title>Categories For Men</Title>
      </Container>
      <ImageWrapper>
        {menCollections.map((product) => (
          <div key={product.id} onClick={() => handleClick(product.id)}>
            <Cardimage src={product.image} alt={product.name} />
            <CategoryCard>
              <ArrowIconWrapper>
                <CategoryTitle>{product.name}</CategoryTitle>
                <ExploreText>Explore Now!</ExploreText>
              </ArrowIconWrapper>
              <ArrowIcon
                src={require("../assets/icons/arrow-right.svg").default}
                alt="Arrow"
              />
            </CategoryCard>
          </div>
        ))}
      </ImageWrapper>
    </Section>
  );
};

export default MensCategory;

// Styled Components

const Section = styled.section`
  width: 80%;
  margin: 100px auto 0;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media screen and (max-width: 490px) {
    
  }


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

const ImageWrapper = styled.div`
  margin: 80px auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: start;
  gap: 50px;

  @media screen and (max-width: 780px) {
    justify-content: center;
  }
`;

const Cardimage = styled.img`
  width: 270.36px;
  height: 393.26px;
  border-radius: 10px;
`;

const CategoryCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  width: 270.36px;
  height: 42.45px;
  gap: 73.18px;
`;

const CategoryTitle = styled.h2`
  font-size: 17.88px;
  font-weight: 500;
  color: #333;
  margin: 5px 0;
`;

const ExploreText = styled.span`
  font-size: 13.41px;
  font-weight: 500;
  color: #777;
`;

const ArrowIconWrapper = styled.div`
  cursor: pointer;
`;

const ArrowIcon = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;
