import React, { useState, useEffect } from 'react';
import Typography from '@mui/material/Typography';
import { Paper, Table, TableBody, TableContainer, TableHead, TableRow, TableCell, CircularProgress, Box, Button } from '@mui/material';
import { useRecoilState } from 'recoil';
import { cartState } from '../../Atoms/CartAtom';
import { ACCESS_TOKEN } from '../../constants';
import api from '../../api';


function OrderTable() {
  const [cart, setCart] = useRecoilState(cartState || []);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (token) {
        try {
          const cartResponse = await api.get('/en/core/cart-order-items/', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCart(cartResponse.data);

          const totalResponse = await api.get('/en/core/cart-order-total/', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setTotal(totalResponse.data.total);
        } catch (error) {
          console.error('Error fetching cart or total:', error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchCart();
  }, [setCart]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper sx={{ width: '90%', overflow: 'hidden', margin: 'auto', marginTop: '2rem' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell colSpan={4} sx={{ backgroundColor: 'inherit', color: 'white' }}>
                <Typography variant="h6" component="div" sx={{ textAlign: 'center' }}>
                  Orders Summary
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Product Name</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.length > 0 ? (
              cart.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.item_title}</TableCell>
                  <TableCell>{item.qty}</TableCell>
                  <TableCell>${item.total}</TableCell>
                  <TableCell>
                    <Typography
                    variant='body2'  
                    >
                      {item.product_status}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} sx={{ textAlign: 'center' }}>
                  No items in your cart.
                </TableCell>
              </TableRow>
            )}
            {cart.length > 0 && (
              <TableRow>
                <TableCell colSpan={2} />
                <TableCell>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    Grand Total
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    ${total.toFixed(2)}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}

export default OrderTable;
