import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Container, Typography, Grid, Box, Stack, Paper, TextField, Button, Divider } from '@mui/material';
import CartItem from '../../components/cartItem/CartItem';
import { cartState } from '../../Atoms/CartAtom';
import api from '../../api';
import { ACCESS_TOKEN } from '../../constants';
import CircularLoader from '../../components/Loader/CircularProgress';
import '../../style/animations.css';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const [cart, setCart] = useRecoilState(cartState);
  const [loading, setLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(true);
  const [coupon, setCoupon] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [shippingFee] = useState(0); 
  const navigate = useNavigate();


  const handleShopping = () => navigate('/main/');


  const fetchCart = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      try {
        const response = await api.get('/en/core/cart-order-items/');
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      } finally {
        setTimeout(() => setLoading(false), 1000); 
      }
    } else {
      setLoading(false);
    }
  };

  
  useEffect(() => {
    fetchCart();
  }, []);

  useEffect(() => {
    if (!loading) {
      const timeoutId = setTimeout(() => setShowLoader(false), 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [loading]);

  useEffect(() => {
    const newSubtotal = cart.reduce((total, item) => total + item.price * item.qty, 0);
    setSubtotal(newSubtotal);
  }, [cart]);

  
  const handleRemove = async (itemId) => {
    if (itemId) {
      try {
        await api.delete(`/en/core/cart-order-items/${itemId}/`);
        fetchCart();
      } catch (error) {
        console.error('Error removing item from cart:', error);
      }
    }
  };

  
  const handleQuantityChange = async (itemId, quantity) => {
    if (itemId && quantity) {
      try {
        await api.patch(`/en/core/cart-order-items/${itemId}/`, { qty: quantity });
        fetchCart();
      } catch (error) {
        console.error('Error updating item quantity:', error);
      }
    }
  };

  const handleApplyCoupon = () => {
    console.log('Coupon applied:', coupon);
  };

  const handleCheckout = () => {
    navigate('/main/checkout');
    console.log('Proceeding to checkout');
  };

  if (showLoader) {
    return (
      <Box sx={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularLoader />
      </Box>
    );
  }

  return (
    <Container className="fade-in-up" sx={{ py: 6 }}>
      <Grid container spacing={3} sx={{ width: '100%', justifyContent: 'center' }}>
        {/* Cart Items Section */}
        <Grid item xs={12} md={7}>
          {cart.length === 0 ? (
            <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Icon icon="noto:shopping-cart" width="100" height="100" />
              <Typography variant="h5" sx={{ mt: 3 }}>
                Your shopping cart is empty.
              </Typography>
              <Typography variant="body1" sx={{ mt: 2 }}>
                It's the perfect time to start shopping.
              </Typography>
              <Button
                onClick={handleShopping}
                sx={{
                  bgcolor: '#2f7889',
                  justifyContent: 'center',
                  mt: 5,
                  width: '100%',
                  maxWidth: 300,
                  py: 1.5,
                  borderRadius: 2,
                  '&:hover': {
                    bgcolor: '#24616e',
                  },
                }}
              >
                <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 'bold' }}>
                  Continue Shopping
                </Typography>
              </Button>
            </Box>
          ) : (
            <Stack spacing={2}>
              {cart.map((item) => (
                <CartItem
                  key={item.id}
                  product={item}
                  onRemove={() => handleRemove(item.id)}
                  onQuantityChange={(quantity) => handleQuantityChange(item.id, quantity)}
                />
              ))}
            </Stack>
          )}
        </Grid>

        {cart.length > 0 && (
          <Grid item xs={12} md={5}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography variant="h5" gutterBottom>
                Order Summary
              </Typography>
              <Stack spacing={3}>
                <Stack direction="row" spacing={0} sx={{ mb: 2 }}>
                  <TextField
                    label="Coupon Code"
                    size="small"
                    variant="outlined"
                    sx={{ flex: 1 }}
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ height: 40 }}
                    onClick={handleApplyCoupon}
                  >
                    Apply
                  </Button>
                </Stack>
                <Box sx={{ mb: 2 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                      Subtotal
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      ${subtotal.toFixed(2)}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="body1" color="text.secondary">
                      Shipping Fee
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      ${shippingFee.toFixed(2)}
                    </Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Typography variant="h5">
                      Total <Typography variant="caption" color="text.secondary">(inclusive of VAT)</Typography>
                    </Typography>
                    <Typography variant="h5">${(subtotal + shippingFee).toFixed(2)}</Typography>
                  </Box>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleCheckout}
                  sx={{ height: 45 }}
                >
                  Checkout
                </Button>
              </Stack>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default CartPage;
