import React from 'react';
import { Box, Typography, Avatar, Rating, Divider, Paper } from '@mui/material';

const reviews = [
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://via.placeholder.com/150',
    rating: 4,
    reviewText: 'Great product, works as expected!',
  },
  {
    id: 2,
    name: 'Jane Smith',
    avatar: 'https://via.placeholder.com/150',
    rating: 5,
    reviewText: 'Absolutely amazing quality and fast delivery.',
  },
  // Add more reviews if needed
];

const ProductReviews = () => {
  return (
    <Paper sx={{ p: 3, mt: 4, borderRadius: 2 }}>
      <Typography variant="h6" gutterBottom>
        Product Ratings & Reviews
      </Typography>
      <Divider sx={{ mb: 2 }} />

      {reviews.map((review) => (
        <Box key={review.id} sx={{ mb: 3 }}>
          <Box display="flex" alignItems="center">
            <Avatar src={review.avatar} alt={review.name} sx={{ mr: 2 }} />
            <Box>
              <Typography variant="subtitle1">{review.name}</Typography>
              <Rating value={review.rating} readOnly />
            </Box>
          </Box>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {review.reviewText}
          </Typography>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}
    </Paper>
  );
};

export default ProductReviews;
