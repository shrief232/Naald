import React from 'react';
import { Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { cartState } from '../../Atoms/CartAtom';

const CartTotal = () => {
  const cart = useRecoilValue(cartState);

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.qty), 0).toFixed(2);
  };

  return (
    <Typography variant="h6">
      Total: ${calculateTotal()}
    </Typography>
  );
};

export default CartTotal;
