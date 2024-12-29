import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";


const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const validateForm = () => {
    if (!username || !password) {
      setErrorMessage("Username and password are required.");
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
        "http://127.0.0.1:8000/api/auth/login/",
        { username, password }
      );

      const { access, refresh } = response.data.tokens;

      localStorage.setItem("authToken", access);  
      localStorage.setItem("refreshToken", refresh);
      localStorage.setItem("username", username);

      console.log("Login successful:", response.data);
      navigate('/');
    } catch (error) {
      console.error("Login error:", error.response.data);
      setErrorMessage(error.response.data.message || "Invalid credentials.");
    }
  };

  const handleRegisterClick = () => {
    
    navigate("/signup");
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Login</Title>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          <Button type="submit">Login</Button>
        </form>
        <RegisterButton type="button" onClick={handleRegisterClick}>
          Signup
        </RegisterButton>
      </FormWrapper>
    </Container>
  );
};


// Styled components for the Login page
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
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

const RegisterButton = styled(Button)`
  background-color: #28a745;
  margin-top: 10px;

  &:hover {
    background-color: #218838;
  }
`;


export default LoginPage;