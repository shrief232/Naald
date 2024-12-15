import { Remove } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { cartState } from '../../Atoms/CartAtom';
import api from '../../api';

const DecrementButton = ({ product }) => {
  const setCart = useSetRecoilState(cartState);

  const handleDecrement = async () => {
    if (product.qty > 1) {
      try {
        const newQty = product.qty - 1;
        await api.patch(`/en/core/cart-order-items/${product.id}/`, { qty: newQty });

        setCart((prevCart) =>
          prevCart.map((item) =>
            item.id === product.id ? { ...item, qty: newQty } : item
          )
        );
      } catch (error) {
        console.error('Error decrementing quantity:', error);
      }
    }
  };

  return (
    <IconButton onClick={handleDecrement} aria-label="decrease quantity">
      <Remove />
    </IconButton>
  );
};

export default DecrementButton;
