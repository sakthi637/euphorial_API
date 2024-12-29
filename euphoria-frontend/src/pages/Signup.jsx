import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

// Styled components for the Register page
const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
`;

const FormWrapper = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #218838;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !email || !password) {
      setErrorMessage("All fields are required.");
      return false;
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Please enter a valid email.");
      return false;
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
    if (!passwordRegex.test(password)) {
      setErrorMessage(
        "Password must be at least 8 characters, with 1 uppercase letter and 1 number."
      );
      return false;
    }

    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/signup/",
        { username, email, password }
      );

      const { access, refresh } = response.data.tokens;

      localStorage.setItem("authToken", access);
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("username", username);

      console.log(localStorage.getItem("authToken"));
      
      console.log("User registered:", response.data);
      navigate("/");
    } catch (error) {
      console.error("Registration error:", error.response.data);
      setErrorMessage(error.response.data.message || "signup failed.");
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Register</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Button type="submit">Register</Button>
        </form>
      </FormWrapper>
    </Container>
  );
};

export default Signup;
