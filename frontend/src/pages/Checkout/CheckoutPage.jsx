import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Card, Button, Typography } from '@mui/material';
import { cartState } from '../../Atoms/CartAtom';
import CircularLoader from '../../components/Loader/CircularProgress';
import { ACCESS_TOKEN } from '../../constants';
import api from '../../api';
import OrderTable from '../../components/Tables&Info/OrdersTable';

export default function CheckoutPage() {
  const [cart, setCart] = useRecoilState(cartState || []);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        try {
          const response = await api.get('/en/core/cart-order-items/');
          setCart(response.data);
          const totalResponse = await api.get('/en/core/cart-order-total/', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTotal(totalResponse.data.total);
        } catch (error) {
          console.error('Error fetching cart:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };
    fetchCart();
  }, [setCart]);

 

  const handlePayment = (method) => {
    console.log(`Processing payment via ${method}`);
    
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularLoader />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', gap: 4, mt: '4rem', justifyContent: 'center' }}>
      <Box sx={{ width: '70%' }}>
        <OrderTable />
      </Box>
      <Box sx={{ width: '30%' }}>
        <Card>
          <Box sx={{ padding: '20px' }}>
            <Typography variant="h6" sx={{ marginBottom: '20px' }}>
              Payment Methods
            </Typography>
            <Typography variant="body1" sx={{ marginBottom: '10px' }}>
              Total Amount: ${total.toFixed(2)}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePayment('Visa')}
              >
                Pay with Visa
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePayment('MasterCard')}
              >
                Pay with MasterCard
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => handlePayment('PayPal')}
              >
                Pay with PayPal
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handlePayment('Vodafone Cash')}
              >
                Pay with Vodafone Cash
              </Button>
            </Box>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
