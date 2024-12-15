import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Snackbar, Typography, Box } from '@mui/material';
import { Icon } from '@iconify/react';
import { useRecoilState } from 'recoil';
import api from '../../api';
import {jwtDecode} from 'jwt-decode';
import { ACCESS_TOKEN } from '../../constants';
import { wishlistState } from '../../Atoms/WishlistAtom';

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

const AddToWishlistButton = ({ product }) => {
  const [wishList, setWishlist] = useRecoilState(wishlistState);
  const [openSnackbar, setOpenSnackbar] = useState(false); 
  const [snackbarMessage, setSnackbarMessage] = useState(''); 
  const [showHoverText, setShowHoverText] = useState(false); 
  const [isInWishList, setIsInWishList] = useState(false); 

  useEffect(() => {
    const fetchWishlist = async () => {
      const userId = getUserIdFromToken();
      if (!userId) return;

      try {
        const response = await api.get('/en/core/wishlist-items/');
        const items = response.data.map(item => ({
          id: item.id,
          product: item.product.id, 
        }));
        setWishlist(items);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    fetchWishlist();
  }, [setWishlist]);

  useEffect(() => {
    const checkIsInWishlist = wishList.some(item => item.product === product.id);
    setIsInWishList(checkIsInWishlist);
  }, [wishList, product.id]);

  const handleClick = async () => {
    const userId = getUserIdFromToken();
    if (!userId || !product.id) {
      console.error('No valid user ID found in token or product ID is missing');
      return;
    }

    try {
      const newItemData = {
        wishlist: userId,
        product: product.id,
        qty: 1,
        review: '',
      };

      const newItemResponse = await api.post('/en/core/wishlist-items/', newItemData);
      
      setWishlist(prevWishlist => [
        ...prevWishlist,
        { id: newItemResponse.data.id, product: product.id }
      ]);

      setIsInWishList(true); 

      setSnackbarMessage('Item added to wishlist successfully');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error adding item to wishlist:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box
      onMouseEnter={() => setShowHoverText(true)}
      onMouseLeave={() => setShowHoverText(false)}
      sx={{ position: 'relative', display: 'inline-block' }}
    >
      <IconButton
        onClick={handleClick}
        disabled={isInWishList}
        fullWidth
        variant="contained"
      >
        <Icon icon='solar:heart-angle-bold' />
      </IconButton>

      {isInWishList && showHoverText && (
        <Typography
          variant="caption"
          color="textSecondary"
          sx={{
            position: 'absolute',
            top: '110%',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            bgcolor: 'inherit',
            padding: '4px 8px',
            borderRadius: '4px',
            whiteSpace: 'nowrap',
            zIndex: 1,
          }}
        >
          Already added to wishlist
        </Typography>
      ) }
 
    </Box>
  );
};

AddToWishlistButton.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default AddToWishlistButton;