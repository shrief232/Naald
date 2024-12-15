import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for type checking
import { Box, Card, CardMedia, CardContent, Typography, Stack } from '@mui/material';
import IncrementButton from '../Buttons/IncrementButton';
import DecrementButton from '../Buttons/DecrementButton';
import RemoveFromCart from '../Buttons/RemoveFromCart';
import AddToWishlistButton from '../Buttons/AddToWishlist';

const CartItem = ({ product, onRemove, onQuantityChange }) => {
  
  const {
    id,
    image = 'default-image-url',
    item_title = 'Default Title',
    price = '0.00',
    qty = 1,
    stock_quantity = 0,
    description = 'Default description'
  } = product || {};

  return (
    <Card sx={{ display: 'flex', flexDirection: 'row', mb: 2, position: 'relative' }}>
      <CardMedia
        component="img"
        image={image}
        alt={item_title}
        sx={{
          width: { xs: '80%', sm: 150 },
          height: { xs: 200, sm: 150 },
          objectFit: 'cover',
          borderRadius: 1,
          mb: { xs: 2, sm: 0 },
        }}
      />
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          p: 3,
          pt: { xs: 1, sm: 2 },
          pb: { xs: 1, sm: 2 },
          position: 'relative',
        }}
      >
        <Typography variant="h6" noWrap sx={{ mb: 1 }}>
          {item_title}
        </Typography>
        <Typography variant="body2" noWrap sx={{ mb: 1 }}>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
          order in 1 d 
        </Typography>
        <Typography variant="body2" color="text.secondary" noWrap sx={{ mb: 1 }}>
          get it Tomorrow
        </Typography>
        <Box sx={{pb:3}} >
          <Typography variant="body2" color="text.primary" noWrap sx={{ mb: 1 }}>
            Get it as early as today! Select fast delivery on checkout
          </Typography>
          <Typography variant="body2" color="text.primary" noWrap sx={{ mb: 1 }}>
              This item cannot be exchanged or returned
          </Typography>
        </Box>
        
        <Box
          sx={{
            position: 'absolute',
            top: 8,
            right: 16,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Typography variant="body1">
            ${price}
          </Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ position: 'absolute', bottom: 8, right: 8, display: 'flex', alignItems: 'center' }}>
          <Stack direction="row" spacing={1}>
            <DecrementButton
              product={{ id, qty }}
              onQuantityChange={onQuantityChange}
            />
            <Typography variant="body2" sx={{ mx: 1 }}>
              {qty}
            </Typography>
            <IncrementButton
              product={{ id, qty, stock_quantity }}
              onQuantityChange={onQuantityChange}
            />
          </Stack>
        </Box>
        <Box sx={{ position: 'absolute', bottom: 5, left: 8 }}>
          <RemoveFromCart
            product={{ id }}
            onRemove={onRemove}
          />
          
        </Box>
      </CardContent>
    </Card>
  );
};

// Add PropTypes for better type checking
CartItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string,
    item_title: PropTypes.string,
    price: PropTypes.string,
    qty: PropTypes.number,
    stock_quantity: PropTypes.number,
    description: PropTypes.string,
  }).isRequired,
  onRemove: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
};

export default CartItem;
