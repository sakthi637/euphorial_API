import React, { useContext, useEffect, useState } from "react";
import { useSearch } from "../components/Search";
import styled from "styled-components";
import { DataContext } from "../services/ProductApi";
import { useNavigate } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MensCollections() {
  const navigate = useNavigate();
  const context = useContext(DataContext);
  const [menCollections, setMenCollections] = useState([]);
  const [isClicked, setIsClicked] = useState({});

  const {search} = useSearch();

  const { data = [], loading, error } = context;

  

  const searchProduct = search
    ? menCollections.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    : menCollections;

  const fetchWishlistStatus = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/wishlist/user/wishlist/`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        
        const wishlistStatus = data.reduce((acc, product) => {
          acc[product.id] = true; 
          return acc;
        }, {});
        setIsClicked(wishlistStatus);
      } else {
        console.error("Failed to fetch wishlist items:", data);
      }
    } catch (error) {
      console.error("Error fetching wishlist items:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (Array.isArray(data)) {
          const filteredProduct = data.filter((product) =>
            product.category.includes("mens collections")
          );
          setMenCollections(filteredProduct);

          await fetchWishlistStatus();
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [data]);

  const handleClick = (id, category) => {
    navigate(`/products/${id}`, {state:{category}});
  };

  const wishlist = async (id) => {
    try {
      const token = localStorage.getItem("authToken");

      if (!token) {
        alert("You need to log in to add to wishlist.");
        return;
      }

      const response = await fetch(
        `http://127.0.0.1:8000/api/v1/wishlist/user/add_wishlist/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ product: id }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        if (data.message === "Product added to your wishlist successfully.") {
          setIsClicked((prev) => ({
            ...prev,
            [id]: true, 
          }));
        } else if (data.message === "Product removed from your wishlist successfully.") {
          setIsClicked((prev) => ({
            ...prev,
            [id]: false, 
          }));
        }
      } else {
        alert("Something went wrong while updating the wishlist.");
      }
    } catch (error) {
      alert("Is alreaddy in Wishlists.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <Header />
      <Section>
        <Container>
          <Hr />
          <Title>Mens Collections</Title>
        </Container>
        <ImageWrapper>
          {searchProduct.map((product) => (
            <div key={product.id}>
              <HeartDiv onClick={() => wishlist(product.id)}>
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M8.49486 2.59679C6.99535 0.849278 4.49481 0.379202 2.61602 1.9794C0.737233 3.5796 0.472726 6.25506 1.94815 8.14762C3.17486 9.72116 6.88733 13.0399 8.10407 14.114C8.2402 14.2342 8.30827 14.2943 8.38766 14.3179C8.45695 14.3385 8.53277 14.3385 8.60207 14.3179C8.68146 14.2943 8.74952 14.2342 8.88565 14.114C10.1024 13.0399 13.8149 9.72116 15.0416 8.14762C16.517 6.25506 16.2848 3.56277 14.3737 1.9794C12.4626 0.396034 9.99438 0.849278 8.49486 2.59679Z"
                    fill={isClicked[product.id] ? "red" : "none"}
                    stroke={isClicked[product.id] ? "red" : "#807D7E"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </HeartDiv>
              <Cardimage
                src={product.image}
                alt={product.name}
                onClick={() => handleClick(product.id, product.category)}
              />

              <CategoryCard>
                <ArrowIconWrapper>
                  <CategoryTitle>{product.name}</CategoryTitle>
                  <ExploreText>{product.brand}'s Brand</ExploreText>
                </ArrowIconWrapper>
                <ArrowIcon>${product.price}</ArrowIcon>
              </CategoryCard>
            </div>
          ))}
        </ImageWrapper>
      </Section>
      <Footer />
    </>
  );
}

const Section = styled.section`
  width: 80%;
  margin: 50px auto 0;
`;

const Container = styled.div`
  width: 430px;
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

const ImageWrapper = styled.div`
  margin: 80px auto 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: start;
  gap: 50px;
`;

const HeartDiv = styled.div`
  position: relative;
  z-index: 5;

  svg {
    background: #fff;
    padding: 2% 2%;
    border-radius: 50%;
    position: absolute;
    top: 25px;
    right: 20px;
    width: 19px;
    height: 20px;
    cursor: pointer;
  }
`;

const Cardimage = styled.img`
  width: 282px;
  height: 370px;
  gap: 0px;
  border-radius: 12px 0px 0px 0px;
  opacity: 0px;
  cursor: pointer;
`;

const CategoryCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
  width: 270.36px;
  height: 42.45px;
  gap: 64px;
`;

const CategoryTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
  line-height: 19.2px;
  color: #333;
  margin: 5px 0;
  width: 150px;
`;

const ExploreText = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #777;
`;

const ArrowIconWrapper = styled.div`
  cursor: pointer;
`;

const ArrowIcon = styled.span`
  background-color: #f6f6f6;
  font-size: 14px;
  font-weight: 700;
  padding: 10px;
  border-radius: 8px;
`;
