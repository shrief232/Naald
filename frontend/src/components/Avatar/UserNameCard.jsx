import React, { useState, useEffect } from 'react';
import { Box, Card, Typography } from '@mui/material';
import api from '../../api';
import { useRecoilValue } from 'recoil';
import { $isAuthorized } from '../../Atoms/authAtom';

const UserNameCard = ({ size = 40, sx = {} }) => {
  const [user, setUser] = useState(null); 
  const userAuthData = useRecoilValue($isAuthorized);

  useEffect(() => {
    if (userAuthData) {
      const fetchUserProfile = async () => {
        try {
          const response = await api.get('en/api/profile/', {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('access')}`,
            },
          });
          setUser(response.data);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserProfile();
    }
  }, [userAuthData]);

  if (!user) {
    return null; 
  }

  return (
    <Card
      sx={{
        display: 'flex',
        alignItems: 'center',
        width:'400px',
        justifyContent:'center',
        maxHeight:'50px',
        gap: 1, 
        ...sx, 
      }}
    >
    
        <Typography variant="h6">Welcome !</Typography>
        <Typography variant="h6">{user.full_name} </Typography>
      
    </Card>
  );
};

export default UserNameCard;
