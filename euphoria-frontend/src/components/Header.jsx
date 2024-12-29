import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import { useSearch } from "./Search";

export default function Header() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const [menuOpen, setmenuOpen] = useState(false);
  
  const {search, setSearch} = useSearch();

  useEffect(() => {
    
    const storedUsername = localStorage.getItem("username");
    setUsername(storedUsername);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login"); 
  };

  const toogleMenu = () => {
    setmenuOpen(!menuOpen);
  };

  return (
    <Navbar>
      {/* Logo */}
      <Menuicon onClick={toogleMenu}>
        <div></div>
        <div></div>
        <div></div>
      </Menuicon>
      <NavLink to="/">
        <Logo
          src={require("../assets/icons/Logo.svg").default}
          alt="Euphoria Logo"
        />
      </NavLink>

      <MobileMenu isOpen={menuOpen}>
        <NavItem>
          <MobileLink to="/shop">Shop</MobileLink>
        </NavItem>
        <NavItem>
          <MobileLink to="/men-collection">Men</MobileLink>
        </NavItem>
        <NavItem>
          <MobileLink to="/women-collection">Women</MobileLink>
        </NavItem>
        <NavItem>
          <MobileLink to="/combos">Combos</MobileLink>
        </NavItem>
        <NavItem>
          <MobileLink to="/joggers">Joggers</MobileLink>
        </NavItem>
      </MobileMenu>

      {/* Navigation Links */}
      <NavList>
        <NavItem>
          <NavLink to="/shop">Shop</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/men-collection">Men</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/women-collection">Women</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/combos">Combos</NavLink>
        </NavItem>
        <NavItem>
          <NavLink to="/joggers">Joggers</NavLink>
        </NavItem>
      </NavList>

      {/* Search Bar */}
      <Inpudiv>
        <img
          src={require("../assets/icons/search.svg").default}
          alt="search_icon"
        />
        <SearchBar
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Inpudiv>

      {/* Icons Section */}
      <IconList>
        <IconItem>
          <NavLink to="/wishlist">
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
                stroke="#807D7E"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </NavLink>
        </IconItem>

        <IconItem>
          <NavLink to="/cart" aria-label="Cart">
            <svg
              width="17"
              height="16"
              viewBox="0 0 17 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 0.25C0.585786 0.25 0.25 0.585786 0.25 1C0.25 1.41421 0.585786 1.75 1 1.75V0.25ZM3.1621 2.48592L2.41652 2.56726L2.41652 2.56726L3.1621 2.48592ZM3.8379 8.68074L3.09232 8.76208L3.09232 8.76208L3.8379 8.68074ZM14.32 8.91185L13.5933 8.72652L13.5933 8.72652L14.32 8.91185ZM15.4699 4.40259L14.7432 4.21726L14.7432 4.21726L15.4699 4.40259ZM4 1.57407C3.58579 1.57407 3.25 1.90986 3.25 2.32407C3.25 2.73829 3.58579 3.07407 4 3.07407V1.57407ZM4.02063 12.4374C3.60642 12.4374 3.27063 12.7732 3.27063 13.1874C3.27063 13.6017 3.60642 13.9374 4.02063 13.9374V12.4374ZM4.64563 13.9374C5.05984 13.9374 5.39563 13.6017 5.39563 13.1874C5.39563 12.7732 5.05984 12.4374 4.64563 12.4374V13.9374ZM4.02063 13.0624C3.60642 13.0624 3.27063 13.3982 3.27063 13.8124C3.27063 14.2267 3.60642 14.5624 4.02063 14.5624V13.0624ZM4.64563 14.5624C5.05984 14.5624 5.39563 14.2267 5.39563 13.8124C5.39563 13.3982 5.05984 13.0624 4.64563 13.0624V14.5624ZM13.1873 12.4374C12.7731 12.4374 12.4373 12.7732 12.4373 13.1874C12.4373 13.6017 12.7731 13.9374 13.1873 13.9374V12.4374ZM13.8123 13.9374C14.2265 13.9374 14.5623 13.6017 14.5623 13.1874C14.5623 12.7732 14.2265 12.4374 13.8123 12.4374V13.9374ZM13.1873 13.0624C12.7731 13.0624 12.4373 13.3982 12.4373 13.8124C12.4373 14.2267 12.7731 14.5624 13.1873 14.5624V13.0624ZM13.8123 14.5624C14.2265 14.5624 14.5623 14.2267 14.5623 13.8124C14.5623 13.3982 14.2265 13.0624 13.8123 13.0624V14.5624ZM1 1.75H1.50526V0.25H1V1.75ZM2.41652 2.56726L3.09232 8.76208L4.58348 8.59941L3.90768 2.40459L2.41652 2.56726ZM5.49474 10.9167H12.705V9.41667H5.49474V10.9167ZM15.0467 9.09718L16.1967 4.58792L14.7432 4.21726L13.5933 8.72652L15.0467 9.09718ZM13.855 1.57407H4V3.07407H13.855V1.57407ZM16.1967 4.58792C16.5864 3.0599 15.4319 1.57407 13.855 1.57407V3.07407C14.4531 3.07407 14.891 3.63767 14.7432 4.21726L16.1967 4.58792ZM12.705 10.9167C13.8097 10.9167 14.7738 10.1676 15.0467 9.09718L13.5933 8.72652C13.4897 9.13254 13.124 9.41667 12.705 9.41667V10.9167ZM3.09232 8.76208C3.22607 9.98806 4.26148 10.9167 5.49474 10.9167V9.41667C5.02695 9.41667 4.63421 9.06444 4.58348 8.59941L3.09232 8.76208ZM1.50526 1.75C1.97305 1.75 2.36579 2.10223 2.41652 2.56726L3.90768 2.40459C3.77393 1.17861 2.73852 0.25 1.50526 0.25V1.75ZM4.41667 13.5C4.41667 13.546 4.37936 13.5833 4.33333 13.5833V15.0833C5.20779 15.0833 5.91667 14.3745 5.91667 13.5H4.41667ZM4.33333 13.5833C4.28731 13.5833 4.25 13.546 4.25 13.5H2.75C2.75 14.3745 3.45888 15.0833 4.33333 15.0833V13.5833ZM4.25 13.5C4.25 13.454 4.28731 13.4167 4.33333 13.4167V11.9167C3.45888 11.9167 2.75 12.6255 2.75 13.5H4.25ZM4.33333 13.4167C4.37936 13.4167 4.41667 13.454 4.41667 13.5H5.91667C5.91667 12.6255 5.20779 11.9167 4.33333 11.9167V13.4167ZM4.02063 13.9374H4.64563V12.4374H4.02063V13.9374ZM4.02063 14.5624H4.64563V13.0624H4.02063V14.5624ZM13.5833 13.5C13.5833 13.546 13.546 13.5833 13.5 13.5833V15.0833C14.3745 15.0833 15.0833 14.3745 15.0833 13.5H13.5833ZM13.5 13.5833C13.454 13.5833 13.4167 13.546 13.4167 13.5H11.9167C11.9167 14.3745 12.6255 15.0833 13.5 15.0833V13.5833ZM13.4167 13.5C13.4167 13.454 13.454 13.4167 13.5 13.4167V11.9167C12.6255 11.9167 11.9167 12.6255 11.9167 13.5H13.4167ZM13.5 13.4167C13.546 13.4167 13.5833 13.454 13.5833 13.5H15.0833C15.0833 12.6255 14.3745 11.9167 13.5 11.9167V13.4167ZM13.1873 13.9374H13.8123V12.4374H13.1873V13.9374ZM13.1873 14.5624H13.8123V13.0624H13.1873V14.5624Z"
                fill="#807D7E"
              />
            </svg>
          </NavLink>
        </IconItem>
        <IconItem>
          <NavLink to={username ? "/profile" : "/login"}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0.25 14.3333C0.25 14.7475 0.585786 15.0833 1 15.0833C1.41421 15.0833 1.75 14.7475 1.75 14.3333H0.25ZM13.5833 14.3333C13.5833 14.7475 13.9191 15.0833 14.3333 15.0833C14.7475 15.0833 15.0833 14.7475 15.0833 14.3333H13.5833ZM11.0833 5.16667C11.0833 7.05364 9.55364 8.58333 7.66667 8.58333V10.0833C10.3821 10.0833 12.5833 7.88207 12.5833 5.16667H11.0833ZM7.66667 8.58333C5.77969 8.58333 4.25 7.05364 4.25 5.16667H2.75C2.75 7.88207 4.95127 10.0833 7.66667 10.0833V8.58333ZM4.25 5.16667C4.25 3.27969 5.77969 1.75 7.66667 1.75V0.25C4.95127 0.25 2.75 2.45127 2.75 5.16667H4.25ZM7.66667 1.75C9.55364 1.75 11.0833 3.27969 11.0833 5.16667H12.5833C12.5833 2.45127 10.3821 0.25 7.66667 0.25V1.75ZM1.75 14.3333C1.75 13.2416 2.33826 12.1961 3.40262 11.3978C4.46721 10.5994 5.9723 10.0833 7.66667 10.0833V8.58333C5.67913 8.58333 3.85089 9.1866 2.50262 10.1978C1.15412 11.2092 0.25 12.6636 0.25 14.3333H1.75ZM15.0833 14.3333C15.0833 12.6636 14.1792 11.2092 12.8307 10.1978C11.4824 9.1866 9.6542 8.58333 7.66667 8.58333V10.0833C9.36103 10.0833 10.8661 10.5994 11.9307 11.3978C12.9951 12.1961 13.5833 13.2416 13.5833 14.3333H15.0833Z"
                fill="#807D7E"
              />
            </svg>
          </NavLink>
          {username ? (
            <UserSection>
              <NavLink to="/profile">
                <span> Hai, {username}</span>
              </NavLink>
              <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
            </UserSection>
          ) : (
            <LoginButton onClick={handleLoginClick}>Login</LoginButton>
          )}
        </IconItem>
      </IconList>
    </Navbar>
  );
}

// Styled Components
const Menuicon = styled.div`
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 18px;
  cursor: pointer;

  div {
    width: 100%;
    height: 3px;
    background-color: #333;
  }

  @media screen and (max-width: 768px) {
    display: flex;
  }
`;

const Navbar = styled.div`
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 70px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  background-color: white;

  @media screen and (min-width: 360px) and (max-width: 1080px) {
    gap: 10px;
  }

  @media screen and (min-width: 768px) and (max-width: 768px) {
    justify-content: space-evenly;
  }

  @media screen and (max-width: 560px) {
    justify-content: space-around;
  }

  @media screen and (max-width: 440px) {
    justify-content: space-evenly;
  }


`;

const MobileMenu = styled.div`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  top: 60px;
  left: 0;
  right: 0;
  background-color: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  z-index: 10;
  list-style: none;
`;

const MobileLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 18px;
  cursor: pointer;

  &:hover {
    color: #000;
    font-weight: bolder;
    transition: color 0.3s ease-in-out;
  }
`;

const Logo = styled.img`
  height: 40px;
  width:100%;

  @media screen and (min-width: 508px) {
    width: 60px;
  }

  @media screen and (max-width: 446px) {
    width: 50px;
  }

  @media screen and (max-width: 440px) {
    display: none;
  }

`;

const NavList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1.5rem;
  font-family: Causten;

  @media screen and (min-width: 360px) and (max-width: 1080px) {
    gap: 1rem;
  }

  @media screen and (min-width: 360px) and (max-width: 768px) {
    display: none;
  }
`;

const NavItem = styled.li`
  font-size: 1rem;
  font-weight: 600;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  &:hover {
    color: #000;
    font-weight: bolder;
    transition: color 0.3s ease-in-out;
  }
`;

const IconList = styled.ul`
  display: flex;
  list-style: none;
  gap: 1rem;

  @media screen and (min-width: 360px) and (max-width: 1080px) {
    gap: 10px;
  }

`;

const IconItem = styled.li`
  display: flex;
  align-items: center;
  gap: 30px;
  svg {
    background-color: #f8f9fa;
    border-radius: 8px;
    height: 20px;
    padding: 10px;
    width: 20px;
  }

  @media screen and (max-width: 446px) {
    svg {
      height: 18px;
      width: 18px;
      padding: 8x;
    }
  }


`;

const Inpudiv = styled.div`
  display: flex;
  align-items: center;
  padding: 0.2rem;
  background: #f6f6f6;
  border-radius: 5px;

  img {
    padding: 0.5rem;
  }

  @media screen and (min-width: 360px) and (max-width: 1080px) {
    padding: 5px;
  }

  @media screen and (max-width: 590px) {
    width: 200px;
  }

  @media screen and (max-width: 560px) {
    width: 150px;
  }

  @media screen and (max-width: 508px) {
    width: 120px;
  }
  @media screen and (max-width: 440px) {
    width: 150px;
  }


`;

const SearchBar = styled.input`
  padding: 0.5rem;
  border: none;
  outline: none;
  border-radius: 5px;
  width: 200px;

  @media screen and (min-width: 768px) and (max-width: 980px) {
    width: 150px;
  }

  @media screen and (max-width: 820px) {
    width: 120px;
  }

  @media screen and (max-width: 560px) {
    width: 100px;
  }

  @media screen and (min-width: 440px) {
    width: 200px;
  }

`;

const LoginButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const LogoutButton = styled.button`
  padding: 10px 15px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 10px;

  &:hover {
    background-color: #c82333;
  }
`;
const UserSection = styled.div`
  display: flex;
  align-items: center;

  @media screen and (min-width: 360px) and (max-width: 980px) {
    display: none;
  }

`;
