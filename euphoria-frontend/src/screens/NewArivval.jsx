import React, { useEffect, useState, useRef, useContext } from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { DataContext } from "../services/ProductApi";
import { useNavigate } from "react-router-dom";

export default function NewArivval() {
  const navigate = useNavigate();
  const context = useContext(DataContext);
  const [newarivval, setNewarivval] = useState([]);

  const { data = [], loading, error } = context;

  useEffect(() => {
    if (Array.isArray(data)) {
      const sortedProducts = data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      const latestProducts = sortedProducts.slice(0, 5);
      setNewarivval(latestProducts);
    }
  }, [data]);

  const handleClick = (id) => {
    navigate(`/products/${id}`);
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <div style={{ fontSize: "30px", color: "black" }}></div>,
    nextArrow: <div style={{ fontSize: "30px", color: "black" }}></div>,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <>
      <Section>
        <Container>
          <Hr />
          <Title>New Arrival</Title>
        </Container>
        <SlickSlider {...settings}>
          {newarivval.map((product) => (
            <ProductCard key={product.id} onClick={() => handleClick(product.id)} >
              <ProductImage src={product.image} alt={product.category} />
              <ProductCategory>{product.category[1]}</ProductCategory>
            </ProductCard>
          ))}
        </SlickSlider>
      </Section>
    </>
  );
}

const Section = styled.section`
  width: 80%;
  margin: 100px auto 0;
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

const SlickSlider = styled(Slider)`
  margin-top: 50px;
  height: 250px;
  .slick-slide {
    display: flex;
    justify-content: center;
  }

  .slick-dots {
    display: none !important;
  }

  .slick-prev,
  .slick-next {
    font-size: 30px;
    background: black;
    border-radius: 50%;
    padding: 10px;
  }

  .slick-prev {
    top: 50%;
  }

  .slick-next {
    top: 50%;
  }
`;

const ProductCard = styled.div`
width: 262.81px;
height: 319.67px;

  gap: 0px;
  border-radius: 12px 0px 0px 0px;
  opacity: 0px;

  border-radius: 8px;
  text-align: center;
  transition: transform 0.3s ease;

`;

const ProductImage = styled.img`
  display: block;
  width: 100%;
  height: auto;
  max-height: 260px;
`;

const ProductCategory = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
  color: #333;
`;
