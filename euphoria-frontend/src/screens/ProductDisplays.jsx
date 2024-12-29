import styled from "styled-components";

import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import fullStar from "../assets/icons/star.svg";
import halfStar from "../assets/icons/half-star.png";
import unfilledStar from "../assets/icons/star-unfill.png";

const ProductPage = () => {
  const { id } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedImage(selectedProduct.image);
      setSelectedColor(selectedProduct.colour[0]);
      setSelectedSize(null);
      setActiveTab(1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedProduct]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/v1/products/${id}`
        );
        if (!response.ok) throw new Error("Failed to fetch product data");
        const result = await response.json();
        setSelectedProduct(result.data);
        setSelectedImage(result.data.image);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  
  const handleAddToCart = async () => {
    const token = localStorage.getItem("authToken");
    console.log(token)
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/user/add-to-cart/${selectedProduct.id}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            color: selectedColor,
            size: selectedSize,
            quantity: 1,
            image: selectedImage,
            id: selectedProduct.id,
          }),
        }
      );
      console.log(response);
      

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Added to cart!");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to add to cart.");
      }
    } catch (error) {
      alert("An error occurred: " + error.message);
    }
  };

  // Buy Now Hook
  const handleBuyNow = async () => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      alert("You must be logged in to buy the product.");
      return;
    }

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/user/buy-now/${selectedProduct.id}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            color: selectedColor,
            size: selectedSize,
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

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<RatingImg key={i} src={fullStar} alt="star" />);
      } else if (rating >= i - 0.5) {
        stars.push(<RatingImg key={i} src={halfStar} alt="half-star" />);
      } else {
        stars.push(
          <RatingImg key={i} src={unfilledStar} alt="unfilled-star" />
        );
      }
    }
    return stars;
  };

  const handleThumbnailClick = (img) => {
    setSelectedImage(img);
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <Wrapper>
        <MainContainer>
          <ImageSection>
            <ThumbnailContainer>
              {selectedProduct.galleries?.map((gallery) => (
                <ThumbnailDiv
                  key={gallery.id}
                  onClick={() => handleThumbnailClick(gallery.image)}
                  $isSelected={selectedImage === gallery.image}
                >
                  <Thumbnail
                    src={gallery.image}
                    alt={`Thumbnail ${gallery.id}`}
                  />
                </ThumbnailDiv>
              ))}
            </ThumbnailContainer>
            <MainImage
              src={selectedImage || selectedProduct.image}
              alt={selectedProduct.name}
            />
          </ImageSection>

          <InfoSection>
            <Breadcrumb>{selectedProduct.category.join(" > ")}</Breadcrumb>
            <Title>{selectedProduct.name}</Title>
            <h5>{selectedProduct.stock > 0 ? `Items aviliable` : `Out of Stock`}</h5>
            <SmallGroup>
              <RateingDiv>
                <div>{renderStars(selectedProduct.rating)}</div>
                <h4>{selectedProduct.rating}</h4>
              </RateingDiv>

              <Comments>
                <Icons src={require("../assets/icons/message.svg").default} />
                {selectedProduct.totalReviews}
                <h4>comments</h4>
              </Comments>
            </SmallGroup>
            <SizesContainer>
              <TextSize>
                <Sizeh3>Select Size</Sizeh3>
                <SizeLink>
                  Size Guide
                  <Icons
                    src={require("../assets/icons/arrow-right.svg").default}
                    width="10px"
                  />
                </SizeLink>
              </TextSize>
              {selectedProduct.size.map((size) => (
                <SizeButton
                  key={size}
                  $isSelected={selectedSize === size}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </SizeButton>
              ))}
            </SizesContainer>
            <ColorsContainer>
              <h3>Colors Available:</h3>
              <ColorsDiv>
                {selectedProduct.colour.map((color) => (
                  <ColorDiv
                    key={color}
                    $isSelected={selectedColor === color}
                    onClick={() => setSelectedColor(color)}
                  >
                    <ColorSpan color={color} />
                  </ColorDiv>
                ))}
              </ColorsDiv>
            </ColorsContainer>
            <SmallGroup>
              <Button onClick={handleAddToCart}>
                <Icons src={require("../assets/icons/cart-1.svg").default} />
                Add to Cart
              </Button>
              <Price onClick={handleBuyNow}>
                Buy For ${selectedProduct.price}
              </Price>
            </SmallGroup>
            <hr />
            <InfoBottom>
              <ContentDiv>
                <IconDiv>
                  <Icons
                    src={require("../assets/icons/credit card.svg").default}
                  />
                </IconDiv>
                <Textp>Secure payment</Textp>
              </ContentDiv>
              <ContentDiv>
                <IconDiv>
                  <Icons
                    src={require("../assets/icons/Size&Fit.svg").default}
                  />
                </IconDiv>
                <Textp>Size & Fit</Textp>
              </ContentDiv>
              <ContentDiv>
                <IconDiv>
                  <Icons src={require("../assets/icons/truck.svg").default} />
                </IconDiv>
                <Textp>Free Shipping</Textp>
              </ContentDiv>
              <ContentDiv>
                <IconDiv>
                  <Icons
                    src={
                      require("../assets/icons/Free-Shipping&Returns.svg")
                        .default
                    }
                  />
                </IconDiv>
                <Textp>Free Shipping & Returns</Textp>
              </ContentDiv>
            </InfoBottom>
          </InfoSection>
        </MainContainer>

        <ProductDescription>
          <Container>
            <Hr />
            <TitleH>Product Description</TitleH>
          </Container>

          <DiscriptionContent>
            <LeftDiv>
              <LeftHead role="tablist" aria-label="My Tabs">
                <HeadButton
                  role="tab"
                  id="tab-1"
                  aria-selected={activeTab === 1}
                  aria-controls="tabpanel-1"
                  tabIndex={activeTab === 1 ? "0" : "-1"}
                  $isSelected={activeTab === 1}
                  onClick={() => handleTabClick(1)}
                >
                  Description
                </HeadButton>
                <HeadButton
                  role="tab"
                  id="tab-2"
                  aria-selected={activeTab === 2}
                  aria-controls="tabpanel-2"
                  tabIndex={activeTab === 2 ? "0" : "-1"}
                  $isSelected={activeTab === 2}
                  onClick={() => handleTabClick(2)}
                >
                  User comments <UCountSpan>27</UCountSpan>
                </HeadButton>
                <HeadButton
                  role="tab"
                  id="tab-3"
                  aria-selected={activeTab === 3}
                  aria-controls="tabpanel-3"
                  tabIndex={activeTab === 3 ? "0" : "-1"}
                  $isSelected={activeTab === 3}
                  onClick={() => handleTabClick(3)}
                >
                  Question & Answer <QCountSpan>04</QCountSpan>
                </HeadButton>
              </LeftHead>

              {activeTab === 1 && (
                <DescriptionText
                  id="tabpanel-1"
                  role="tabpanel"
                  aria-labelledby="tab-1"
                  tabIndex="0"
                >
                  {selectedProduct.description}
                </DescriptionText>
              )}
              {activeTab === 2 && (
                <DescriptionText
                  id="tabpanel-2"
                  role="tabpanel"
                  aria-labelledby="tab-2"
                  tabIndex="0"
                >
                  User comments go here.
                </DescriptionText>
              )}
              {activeTab === 3 && (
                <DescriptionText
                  id="tabpanel-3"
                  role="tabpanel"
                  aria-labelledby="tab-3"
                  tabIndex="0"
                >
                  Questions & Answers go here.
                </DescriptionText>
              )}
            </LeftDiv>
            <RightDiv>
              <FeaturesList>
                {Object.entries(selectedProduct.feature || {}).map(
                  ([key, value]) => (
                    <FeatureItem key={key}>
                      <FearureHead>{key}</FearureHead>{" "}
                      <FearureContent>{value}</FearureContent>
                    </FeatureItem>
                  )
                )}
              </FeaturesList>
            </RightDiv>
          </DiscriptionContent>
        </ProductDescription>
      </Wrapper>
    </>
  );
};
export default ProductPage;

const Wrapper = styled.section`
  width: 90%;
  margin: 30px auto 0;
`;

const Breadcrumb = styled.p`
  font-size: 18px;
  font-weight: 500;
  color: #6c757d;
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;
  @media (max-width: 900px) {
    grid-template-columns: 1fr 1fr;
    gap: 9rem;
  }
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const ImageSection = styled.div`
  display: flex;
  gap: 1rem;
  background-color: #f6f6f6;
  padding-left: 5rem;
  width: 80%;
  @media (max-width: 900px) {
    padding-left: 1rem;
    align-items: center;
    width: 100%;
  }
  @media (max-width: 768px) {
    padding-left: 0;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  margin-bottom: 15px;
  @media (max-width: 768px) {
    padding-top: 10px;
    width: 100%;
    max-height: 300px;
    object-fit: contain;
    order: 1;
  }
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 10px;
  @media (max-width: 768px) {
    order: 2;
    flex-direction: row;
    justify-content: center;
    padding-bottom: 10px;
  }
`;
const ThumbnailDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 62px;
  height: 62px;
  border: ${(props) => (props.$isSelected ? "0.76px solid #3C4242" : "none")};
`;
const Thumbnail = styled.img`
  width: 60px;
  height: 60px;
  border: 2px solid transparent;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    border-color: 1px solid #000;
  }

  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 80%;

  h5 {
    font-size: 18px;
    color: green;
  }
  @media (max-width: 900px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: start;
    flex-wrap: wrap;
  }
`;

const Title = styled.h1`
  font-size: 34px;
  width: 600px;
  line-height: 47px;
  @media (max-width: 900px) {
    width: 100%;
  }
  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: start;
  }
`;
const Price = styled.div`
  border: 1px solid #000;
  color: #000;
  padding: 10px 20px;
  border-radius: 5px;
  width: fit-content;
  height: fit-content;
  cursor: pointer;
  @media (max-width: 768px) {
    padding: 8px 15px;
    font-size: 0.9rem;
  }
`;

const SizesContainer = styled.div`
  margin: 15px 0;
`;
const Sizeh3 = styled.h3`
  font-size: 18px;
  font-weight: 600;
`;
const SizeLink = styled(Link)`
  color: gray;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const TextSize = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;
const SizeButton = styled.button`
  margin-right: 10px;
  margin-top: 20px;
  padding: 10px 20px;
  border: 1px solid #bebcbd;
  cursor: pointer;
  border-radius: 5px;
  color: ${(props) => (props.$isSelected ? "#3C4242" : "")};
  &:hover {
    background-color: #ddd;
  }
`;
const Button = styled.button`
  background-color: #8a33fc;
  color: white;
  padding: 10px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: #0056b3;
  }
  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 8px 20px;
  }
`;
const ProductDescription = styled.div`
  margin: 50px auto;
  @media (max-width: 900px) {
    margin-top: 20px;
    padding: 1rem;
    width: 90%;
  }
`;
const DescriptionText = styled.p`
  font-size: 1rem;
  color: #6c757d;
  @media (max-width: 500px) {
    font-size: 0.8rem;
  }
`;
const FeaturesList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
  background-color: #f6f6f6;
  padding: 1rem;
  border-radius: 10px;
  & > div {
    border-bottom: 1px solid #ddd;
    border-right: 1px solid #ddd;
  }

  & > div:nth-child(3n) {
    border-right: none;
  }

  & > div:nth-last-child(-n + 3) {
    border-bottom: none;
  }
  @media (max-width: 768px) {
    
  }
`;
const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 1.2rem;
  color: #333;
  gap: 0.7rem;
`;
const FearureHead = styled.p`
  font-size: 0.8rem;
  color: gray;
`;
const FearureContent = styled.p`
  font-size: 0.9rem;
  font-weight: 600;
`;
const SmallGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;
  @media (max-width: 768px) {
    flex-direction: row;
    gap: 1rem;
  }
`;
const Comments = styled.div`
  display: flex;
  gap: 0.4rem;

  h4 {
    font-family: Causten;
    font-size: 18px;
    font-weight: 500;
    line-height: 21.6px;
    color: #807d7e;
  }
`;
const Icons = styled.img`
  display: block;
`;
const RatingImg = styled.img`
  height: 22px;
  width: 22px;
`;
const RateingDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  h4 {
    font-size: 18px;
    font-weight: 500;
  }
`;
const ColorsContainer = styled.div`
  margin: 15px 0;
`;
const ColorsDiv = styled.div`
  display: flex;
  gap: 1rem;
`;
const ColorDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: ${(props) => (props.$isSelected ? "2px solid #ddd" : "none")};
`;
const ColorSpan = styled.div`
  display: inline-block;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  width: 20px;
  height: 20px;
  cursor: pointer;
`;
const InfoBottom = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  @media (max-width: 525px) {
    margin: 5%;
  }
`;
const ContentDiv = styled.div`
  display: flex;
  gap: 0.5rem;
  align-items: center;
`;
const IconDiv = styled.div`
  background-color: #f6f6f6;
  padding: 1rem;
  border-radius: 100%;
`;
const Textp = styled.p`
  margin-top: 5px;
`;
const LeftHead = styled.div`
  width: 100%;
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
  @media (max-width: 768px) {
    gap: 1rem;
    justify-content: space-around;
  }
`;
const HeadButton = styled.button`
  background: none;
  border: none;
  display: flex;
  cursor: pointer;
  font-size: 1rem;
  padding: 10px 0;
  position: relative;
  color: ${(props) => (props.$isSelected ? "#333" : "#aaa")};
  border-bottom: ${(props) =>
    props.$isSelected ? "2px solid #fff" : "2px solid transparent"};
  &:focus {
    outline: none;
  }
  transition: color 0.3s, border-bottom 0.3s;

  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 50px;
    height: 2px;
    border-radius: 50%;
    background-color: ${(props) =>
      props.$isSelected ? "#000" : "transparent"};
    transition: background-color 0.3s;
  }
  @media (max-width: 450px) {
    font-size: 0.8rem;
  }
  @media (max-width: 363px) {
    font-size: 0.7rem;
  }
`;
const UCountSpan = styled.span`
  background-color: #8a33fc;
  font-size: 0.7rem;
  margin-left: 10px;
  color: white;
  padding: 3px 4px;
  border-radius: 2px;
  display: block;
  width: fit-content;
  @media (max-width: 538px) {
    display: none;
  }
`;
const QCountSpan = styled.span`
  background-color: #000;
  font-size: 0.7rem;
  margin-left: 10px;
  color: white;
  padding: 3px 4px;
  border-radius: 2px;
  display: block;
  width: fit-content;
  @media (max-width: 538px) {
    display: none;
  }
`;

const DiscriptionContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;
const LeftDiv = styled.div``;
const RightDiv = styled.div``;
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

const TitleH = styled.h1`
  font-size: 34px;
  font-weight: 600;
  color: #333;
`;
