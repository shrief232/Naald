import { Add } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { cartState } from '../../Atoms/CartAtom';
import api from '../../api';

const IncrementButton = ({ product }) => {
  const setCart = useSetRecoilState(cartState);

  const handleIncrement = async () => {
    if (product.qty < product.stock_quantity) {
      try {
        const newQty = product.qty + 1;
        await api.patch(`/en/core/cart-order-items/${product.id}/`, { qty: newQty });

        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === product.id ? { ...item, qty: newQty } : item
          )
        );
      } catch (error) {
        console.error('Error incrementing quantity:', error.response ? error.response.data : error.message);
      }
    } else {
      console.warn('Cannot increment beyond stock quantity');
    }
  };

  return (
    <IconButton onClick={handleIncrement} aria-label="increase quantity">
      <Add />
    </IconButton>
  );
};

export default IncrementButton;
