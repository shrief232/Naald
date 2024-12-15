
import {  Snackbar, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, SnackbarContent } from '@mui/material';
import React, { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { cartState } from '../../Atoms/CartAtom';
import api from '../../api';
import DeleteIcon from '@mui/icons-material/Delete';

const RemoveFromCart = ({ product }) => {
  const setCart = useSetRecoilState(cartState);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleRemove = async () => {
    try {
      await api.delete(`/en/core/cart-order-items/${product.id}/`);
      setCart((prevCart) => prevCart.filter((item) => item.id !== product.id));
      setOpenSnackbar(true); 
      setOpenDialog(false); 
      console.log("Product removed successfully."); 
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <>
      <Button variant="outlined" size="small" startIcon={<DeleteIcon />} onClick={handleOpenDialog} >
         Remove
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Remove from cart</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove this product from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleRemove} color="primary">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <SnackbarContent onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}
         message={
            'Product removed successfully!'
          } 
        />
          
        
      </Snackbar>
    </>
  );
};

export default RemoveFromCart;
