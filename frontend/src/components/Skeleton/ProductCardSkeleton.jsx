import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Skeleton,
  Avatar,
  IconButton,
} from '@mui/material';
import BarLogo from '../logo/BarLogo';

const ProductCardSkeleton = () => {
  return (
    <Card sx={{ maxWidth: 345, borderRadius: '10px' }}>
      <CardHeader
        avatar={<Skeleton variant="circular" width={40} height={40} />}
        action={<Skeleton variant="circular" width={24} height={24} />}
        title={<Skeleton variant="text" width="60%" />}
        subheader={<Skeleton variant="text" width="40%" />}
      />
      <Skeleton variant="rectangular" height={250} />
      <CardContent> 
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="60%" />
      </CardContent>
      <CardActions disableSpacing>
        <Skeleton variant="circular" width={24} height={24} />
        <Skeleton variant="circular" width={24} height={24} />
      </CardActions>
    </Card>
  );
};

export default ProductCardSkeleton;
