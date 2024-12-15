import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import api from '../../api';
import { useRecoilValue } from 'recoil';
import { $isAuthorized } from '../../Atoms/authAtom';

const UserName = ({ size = 40, sx = {} }) => {
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
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1, 
        ...sx, 
      }}
    >
        <Typography variant="body2">Hi, </Typography>
        <Typography variant="body2">{user.full_name}</Typography>
      
    </Box>
  );
};

export default UserName;
