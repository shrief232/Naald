import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import { useRecoilState } from 'recoil';
import { cartState } from '../../../Atoms/CartAtom';
import api from '../../../api';
import { jwtDecode } from 'jwt-decode';
import { ACCESS_TOKEN } from '../../../constants';

const getUserIdFromToken = () => {
  const token = localStorage.getItem(ACCESS_TOKEN);
  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      return decodedToken.user_id;
    } catch (error) {
      console.error('Error decoding token:', error);
      return null;
    }
  }
  return null;
};

const AddToCartBtn = ({ product = {}, quantity = 1 }) => {
  const [cart, setCart] = useRecoilState(cartState);

  const handleClick = async () => {
    const userId = getUserIdFromToken();
    if (!userId || !product.id) {
      console.error('No valid user ID found in token or product ID is missing');
      return;
    }

    try {
      const cartOrdersResponse = await api.get('/en/core/cart-orders/');
      let cartOrder = cartOrdersResponse.data.find(order => order.user === userId);

      if (!cartOrder) {
        const newCartOrderResponse = await api.post('/en/core/cart-orders/', { user: userId });
        cartOrder = newCartOrderResponse.data;
      }

      const existingItem = cart.find(item => item.item === product.id);

      if (existingItem) {
        await api.patch(`/en/core/cart-order-items/${existingItem.id}/`, { qty: existingItem.qty + quantity });
      } else {
        await api.post('/en/core/cart-order-items/', {
          cart_order: cartOrder.id,
          item: product.id,
          qty: quantity,
        });
      }

      const response = await api.get('/en/core/cart-order-items/');
      setCart(response.data);
    } catch (error) {
      console.error('Error adding item to cart:', error.response ? error.response.data : error.message);
    }
  };

  const isInCart = cart.some(item => item.item === product.id);

  return (
    
        <LoadingButton
          onClick={handleClick}
          disabled={isInCart}
          fullWidth
          variant="contained"
          sx={{
            bgcolor: 'grey',
            color: 'white',
            fontSize: 14,
            fontWeight: 600,
            transition: 'background-color 0.3s ease',
            borderRadius: 1,
            '&:hover': {
              bgcolor: 'grey.600',
            },
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <Icon icon="solar:cart-large-2-bold" />
          <Typography variant="button">
            {isInCart ? 'Added' : 'Add To Cart'}
          </Typography>
        </LoadingButton>
     
  );
};

AddToCartBtn.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  quantity: PropTypes.number,
};

export default AddToCartBtn;
