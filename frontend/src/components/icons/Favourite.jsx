import React from 'react';
import { IconButton } from '@mui/material';
import { Icon } from '@iconify/react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { wishlistState } from '../../Atoms/WishlistAtom';
import { useThemeToggle } from '../hooks-form/ToggleProvider';

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));

const Favourite = () => {
  const wishlist = useRecoilValue(wishlistState); 
  const { mode } = useThemeToggle(); 
  const navigate = useNavigate();

  
  const getTotalQuantity = () => {
    return wishlist.length;  
  };

  
  const handleClick = () => {
    navigate('/main/wish');
  };

  return (
    <IconButton aria-label="wishlist" onClick={handleClick}sx={{mr:1}}>
      <StyledBadge badgeContent={getTotalQuantity()} color="secondary">
        <Icon icon='solar:heart-angle-bold' color={ mode === 'dark' ? '#bc9679' : '#183a27' } />  
      </StyledBadge>
    </IconButton>
  );
};

export default Favourite;
