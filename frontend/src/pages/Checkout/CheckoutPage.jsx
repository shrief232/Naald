import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { Box, Table, TableBody, TableContainer, TableHead, Card, Button, Typography, Paper } from '@mui/material';
// import OrdersTable from '../../components/Tables/OrdersTable';
import { cartState } from '../../Atoms/CartAtom';
import CircularLoader from '../../components/Loader/CircularProgress';
import { ACCESS_TOKEN } from '../../constants';
import api from '../../api';

export default function CheckoutPage() {
  const [cart, setCart] = useRecoilState(cartState || []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        try {
          const response = await api.get('/en/core/cart-order-items/');
          setCart(response.data);
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

  // Calculate the total amount safely
  const totalAmount = Array.isArray(cart)
    ? cart.reduce((acc, product) => acc + (product.total || 0), 0)
    : 0;

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularLoader />
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', gap: 4, mt: '4rem', justifyContent: 'center' }}>
      <Box>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="cart table">
            <TableHead>
              <Card sx={{ height: '50px', alignContent: 'center', ml: '10px' }}>
                <Typography sx={{ padding: 1 }}>Cart Summary</Typography>
              </Card>
            </TableHead>
            {/* <TableBody>
              {cart.map((product) => (
                <OrdersTable key={product.id} product={product} />
              ))}
            </TableBody> */}
          </Table>
        </TableContainer>
      </Box>
      <Box sx={{ width: '30%' }}>
        <Card>
          <Box sx={{ padding: '20px' }}>
            {/* <Typography variant="h6">Total Amount</Typography>
            <Typography>Subtotal: ${totalAmount.toFixed(2)}</Typography>
            <Typography>Shipping Fee: $5.00</Typography>
            <Typography>Total: ${(totalAmount + 5).toFixed(2)}</Typography> */}
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
            <Button variant="contained" color="primary">Checkout</Button>
          </Box>
        </Card>
      </Box>
    </Box>
  );
}
