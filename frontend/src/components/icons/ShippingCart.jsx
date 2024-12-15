import * as React from 'react';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import { cartState } from '../../Atoms/CartAtom';
import { useRecoilValue } from 'recoil';
import { useThemeToggle } from '../hooks-form/ToggleProvider';

// Style the Badge component
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: '0 4px',
  },
}));


const ShippingCart = ({ quantity }) => {
  const cart = useRecoilValue(cartState); 
  const { mode } = useThemeToggle(); 
  const navigate = useNavigate(); 

  const getTotalQuantity = () => {
    return cart.reduce((total, item) => total + item.qty, 0);
  };

  const handleClick = () => {
    navigate('/main/cart');
  };
  return (
    <IconButton aria-label="cart" onClick={handleClick} sx={{mr:1}}>
      <StyledBadge badgeContent={quantity} color="secondary">
        <Icon icon="solar:cart-large-2-bold" color={ mode === 'dark' ? '#bc9679': '#183a27'} />
      </StyledBadge>
    </IconButton>
  );
};

export default ShippingCart;
