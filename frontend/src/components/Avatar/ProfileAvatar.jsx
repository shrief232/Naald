import React, { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import api from '../../api';
import { useRecoilValue } from 'recoil';
import { $isAuthorized } from '../../Atoms/authAtom';

const UserAvatar = ({ size = 40, sx = {} }) => {
  const [profileImageUrl, setProfileImageUrl] = useState('');
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
          const data = await response.data;
          if (data?.profile_image) {
            setProfileImageUrl(`http://localhost:8000${data.profile_image}`);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserProfile();
    }
  }, [userAuthData]);

  return (
    <Avatar
      src={profileImageUrl}
      sx={{
        width: size,
        height: size,
        ...sx, 
      }}
    />
  );
};

export default UserAvatar;
