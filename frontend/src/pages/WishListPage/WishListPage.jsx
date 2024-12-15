import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Container, Typography, Grid, Box, Snackbar } from '@mui/material';
import api from '../../api';
import CircularLoader from '../../components/Loader/CircularProgress';
import WishListCard from '../../components/card/wishListCard';
import { wishlistState } from '../../Atoms/WishlistAtom';

const WishListPage = () => {
  const [wishList, setWishList] = useRecoilState(wishlistState); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  
  const fetchWishlist = async () => {
    try {
      const response = await api.get('/en/core/wishlist-items/');
      const items = response.data.map(item => ({
        id: item.id,
        product: item.product
      }));
      setWishList(items); 
    } catch (error) {
      setError('Failed to fetch wishlist.');
      setOpenSnackbar(true);
    } finally {
      
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
      setLoading(false);
    }
  };

  
  const handleRemove = async (itemId) => {
    try {
      await api.delete(`/en/core/wishlist-items/${itemId}/`); 
      setWishList(prevList => {
        const updatedList = prevList.filter(item => item.id !== itemId); 
        localStorage.setItem('wishList', JSON.stringify(updatedList)); 
        return updatedList; 
      });
    } catch (error) {
      setError('Failed to remove item.');
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularLoader />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h4" gutterBottom>My Wish List</Typography>
      <Grid container spacing={2}>
        {wishList.length === 0 ? (
          <Typography>No items in the wishlist.</Typography>
        ) : (
          wishList.map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.id}>
              <WishListCard 
                product={item.product} 
                onRemove={() => handleRemove(item.id)}  
              />
            </Grid>
          ))
        )}
      </Grid>
      <Snackbar
        open={openSnackbar}
        onClose={handleCloseSnackbar}
        message={error}
        autoHideDuration={6000}
      />
    </Container>
  );
};

export default WishListPage;
