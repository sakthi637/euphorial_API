import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SlideShow from "../screens/SlideShow";
import BrandsScreen from "../screens/BrandsScreen";
import OfferSec from "../screens/OfferSec";
import Offerdiv from "../screens/Offerdiv";
import NewArivval from "../screens/NewArivval";
import MensCategory from "../screens/MensCategory";
import WomensCategory from "../screens/WomensCategory";
import Limelight from "../screens/Limelight";
import Feedback from "../screens/Feedback";

export default function Home() {
  return (
    <>
      <Header />
      <SlideShow />
      <OfferSec />
      <NewArivval />
      <Offerdiv />
      <MensCategory />
      <WomensCategory />
      <BrandsScreen />
      <Limelight />
      <Feedback />
      <Footer />
    </>
  );
}
