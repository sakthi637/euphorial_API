import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ProductDisplays from "../screens/ProductDisplays";
import SimilarProduct from "../screens/SimilarProduct";

export default function ProductsDetail() {
  return (
    <>
      <Header />
      <ProductDisplays/>
      <SimilarProduct/>
      <Footer />
    </>
  );
}
