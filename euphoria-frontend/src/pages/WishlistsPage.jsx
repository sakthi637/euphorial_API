import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const WishlistsPage = () => {
  const navigate = useNavigate();
  const [wishlists, setWishlists] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const refreshAuthToken = async () => {
    let token = localStorage.getItem("authToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!token || !refreshToken) {
      setErrorMessage("Refresh token not found. Please log in again.");
      return null;
    }

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/token/refresh/",
        { refresh: refreshToken }
      );
      if (response.data.access) {
        localStorage.setItem("authToken", response.data.access);
        return response.data.access;
      } else {
        setErrorMessage("Invalid refresh token. Please log in again.");
        return null;
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      setErrorMessage("Failed to refresh token. Please log in again.");
      return null;
    }
  };

  const handleAddToCart = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/user/add-to-cart/${id}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: 1,
          }),
        }
      );
      console.log(response);
      console.log(response.headers);

      const contentType = response.headers.get("Content-Type");

      if (response.ok) {
        if (contentType && contentType.includes("application/json")) {
          const result = await response.json();
          alert(result.message || "Added to cart!");
        } else {
          alert("Unexpected response from the server.");
        }
      } else {
        if (contentType && contentType.includes("application/json")) {
          const error = await response.json();
          alert(error.message || "Failed to add to cart.");
        } else {
          alert(
            "An error occurred. The server response is not in JSON format."
          );
        }
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };


  const handleBuyNow = async (id) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to buy the product.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/user/buy-now/${id}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: 1,
          }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Purchase successful!");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to complete the purchase.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };



  // Fetch wishlists
  const fetchWishlists = useCallback(async () => {
    let token = localStorage.getItem("authToken");

    if (!token) {
      setErrorMessage("You need to log in to view your wishlists.");
      setLoading(false);
      return;
    }

    // Refresh token if expired
    const refreshedToken = await refreshAuthToken();
    if (refreshedToken) {
      token = refreshedToken;
    }

    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/v1/wishlist/user/wishlist/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.data) {
        setWishlists(response.data.data);
      } else {
        setErrorMessage("No wishlists found.");
      }
    } catch (error) {
      if (error.response) {
        setErrorMessage(" You didn't add  any wihslist ");
      } else {
        setErrorMessage("Session expired. Please log in again. ");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWishlists();
  }, [fetchWishlists]);

  const handleImageClick = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <>
      <Header />
      <WishlistContainer>
        <Title>Your Wishlists</Title>

        {loading && <LoadingText>Loading...</LoadingText>}

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        {wishlists.length > 0 && (
          <WishlistList>
            {wishlists.map((wishlist) => (
              <WishlistItem key={wishlist.id}>
                <ProductImage
                  src={wishlist.product.image}
                  alt={wishlist.product.name}
                  onClick={() => handleImageClick(wishlist.product.id)}
                />
                <NameDiv>
                  <ProductName>{wishlist.product.name}</ProductName>
                  <ProductPrice>
                    Price : $ {wishlist.product.price}
                  </ProductPrice>
                  <Button onClick={() => handleAddToCart(wishlist.product.id)}>
                    Add to cart
                  </Button>
                  <Button1 onClick={() => handleBuyNow(wishlist.product.id)}>
                    Buy Now
                  </Button1>
                </NameDiv>
              </WishlistItem>
            ))}
          </WishlistList>
        )}
      </WishlistContainer>

      <Footer />
    </>
  );
};
export default WishlistsPage;
const WishlistContainer = styled.section`
  width: 80%;
  margin: 50px auto 0;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: #333;
`;

const LoadingText = styled.p`
  font-size: 1.2rem;
  color: #888;
`;

const ErrorMessage = styled.p`
  font-size: 1rem;
  color: red;
`;

const WishlistList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 40px;
  margin-top: 40px;

  padding: 0;
`;

const WishlistItem = styled.li`
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #f9f9f9;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
`;
const Button1 = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
`;

const NameDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.h3`
  font-size: 18px;
  font-weight: 600;

  color: #333;
`;

const ProductPrice = styled.p`
  font-size: 14px;
  color: green;
`;

const ProductImage = styled.img`
  width: 100%;
  height: auto;
`;
