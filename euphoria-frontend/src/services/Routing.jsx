import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import ProductsDetail from "../pages/ProductsDetail";
import Signup from "../pages/Signup";
import UserProfile from "../pages/UserProfile";
import WishlistsPage from "../pages/WishlistsPage";
import MensCollections from "../pages/MensCollections";
import ProductApi from "./ProductApi";
import WomensCollections from "../pages/WomensCollections";
import AddtoCartPage from "../pages/AddtoCartPage";
import { Search } from "../components/Search";

export default function Routing() {
  return (
    <Router>
      <Outlet />
      <ProductApi>
        <Search>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/cart" element={<AddtoCartPage />} />

            <Route path="/men-collection" element={<MensCollections />} />
            <Route path="/women-collection" element={<WomensCollections />} />
            <Route path="/wishlist" element={<WishlistsPage />} />
            <Route path="/products/:id" element={<ProductsDetail />} />
          </Routes>
        </Search>
      </ProductApi>
    </Router>
  );
}
