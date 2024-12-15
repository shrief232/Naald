import { Box, Typography, Button, Rating } from '@mui/material';

const ProductDetails = ({ product }) => (
  <Box sx={{ padding: 2 }}>
    <Typography variant="h5">{product.title}</Typography>
    <Typography variant="h6">${product.price}</Typography>
    <Typography variant="body1">{product.description}</Typography>
    <Rating name="read-only" value={product.rating} readOnly />
    <Box sx={{ marginTop: 2 }}>
      <Button variant="contained">Add to Cart</Button>
      <Button variant="outlined" sx={{ marginLeft: 2 }}>Add to Wishlist</Button>
    </Box>
  </Box>
);

export default ProductDetails;