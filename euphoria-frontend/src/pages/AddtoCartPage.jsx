import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AddtoCartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCartItems = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        setError("You must be logged in to view the cart.");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/user/cart/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          setError("You must be logged in to view the cart.");
          setLoading(false);
          return;
        }

        if (!response.ok) {
          const data = await response.text();  // Get the raw text if response is not JSON
          console.error("Failed to fetch cart items:", data);
          setError("Failed to fetch cart items.");
          setLoading(false);
          return;
        }

        const data = await response.json();
        setCartItems(data.cart_items);
      } catch (err) {
        console.error("An error occurred while fetching the cart:", err);
        setError("An error occurred while fetching the cart.");
      } finally {
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

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

      const result = await response.json();
      if (response.ok) {
        alert(result.message || "Purchase successful!");

        // Remove the purchased item from the cart
        setCartItems((prevCartItems) =>
          prevCartItems.filter((item) => item.id !== id)
        );
      } else {
        alert(result.message || "Failed to complete the purchase.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <Header />
      <Section>
        <Container>
          <Hr />
          <Title>Your Cart</Title>
        </Container>
        <CartContent>
          {cartItems.length === 0 ? (
            <EmptyCartMessage>Your cart is empty.</EmptyCartMessage>
          ) : (
            <CartList>
              {cartItems.map((item) => (
                <CartItem key={item.id}> 
                  <NameDiv key={item.id} >
                    <ProductName>{item.product_name}</ProductName>
                    <ProductPrice>Price: ${item.price}</ProductPrice>
                    <Quantity>Quantity: {item.quantity}</Quantity>
                    <TotalPrice>Total Price: ${item.total_price}</TotalPrice>

                    <Button1 onClick={() => handleBuyNow(item.id)}>
                      Buy Now
                    </Button1>
                  </NameDiv>
                </CartItem>
              ))}
            </CartList>
          )}
        </CartContent>
      </Section>
      <Footer />
    </>
  );
}


const Section = styled.section`
  width: 80%;
  margin: 50px auto 0;

  @media (max-width: 768px) {
    width: 95%;
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 30px;
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
  text-align: left;
`;

const CartContent = styled.div`
  width: 100%;
  margin-top: 20px;
`;

const EmptyCartMessage = styled.p`
  font-size: 20px;
  color: #888;
  text-align: center;
`;

const CartList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: space-between;
`;

const CartItem = styled.li`
  width: 280px;
  height: auto;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  border: 1px solid #ddd;

  &:hover {
    transform: scale(1.05);
  }

  @media (max-width: 768px) {
    width: 100%;
  }
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

const Quantity = styled.p`
  font-size: 14px;
  color: #333;
`;

const TotalPrice = styled.p`
  font-size: 16px;
  color: #4caf50;
`;

const Button1 = styled.button`
  margin-top: 10px;
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: darkred;
  }
`;
