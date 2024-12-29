// src/UserProfile.js
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';



const UserProfile = () => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        navigate('/login'); 
        return;
      }

      try {
        const response = await fetch('http://127.0.0.1:8000/api/v1/wishlist/user/profile/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const data = await response.json();
          console.error('Error fetching user data:', data);
          navigate('/login'); 
          return;
        }

        const data = await response.json();
        setUserData(data);
      } catch (error) {
        setError('Failed to load user data. Please try again.');
        console.error('Error:', error);
        navigate('/login'); 
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <ProfileContainer>
      <Avatar 
        src={userData.avatarUrl || 'https://via.placeholder.com/100'} 
        alt="User Avatar" 
      />
      <ProfileHeader>User Profile</ProfileHeader>
      <UserDetails>
        <UserDetail>Name: {userData.username || 'N/A'}</UserDetail>
        <UserDetail>Email: {userData.email || 'N/A'}</UserDetail>
        <UserDetail>Location: {userData.location || 'N/A'}</UserDetail>
        <UserDetail>Phone: {userData.phone || 'N/A'}</UserDetail>
      </UserDetails>
      <ButtonContainer>
        <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
      </ButtonContainer>
    </ProfileContainer>
  );
};

export default UserProfile;


const ProfileContainer = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 100px auto;
  padding: 40px;
  background-color: #f9f9f9;
  border-radius: 16px;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
`;

const ProfileHeader = styled.h1`
  text-align: center;
  color: #333;
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const UserDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 15px;
`;

const UserDetail = styled.div`
  font-size: 18px;
  color: #555;
  padding: 10px 20px;
  background-color: #ffffff;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 30px;
`;

const Button = styled.button`
  padding: 12px 24px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const LogoutButton = styled(Button)`
  background-color: #dc3545;
  &:hover {
    background-color: #c82333;
  }
`;

const Avatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #007bff;
  margin-bottom: 20px;
`;