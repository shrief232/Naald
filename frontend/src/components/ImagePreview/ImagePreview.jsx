import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Box, CardMedia } from '@mui/material';

const ImageCarousel = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState(images[0]?.images || '');

  return (
    <Box sx={{ width: { xs: '100%', md: '50%' }, position: 'relative' }}>
      <CardMedia
        component="img"
        image={selectedImage}
        alt="Main Product Image"
        sx={{
          width: '100%',
          height: '400px',
          objectFit: 'contain',
          borderRadius: '4px',
        }}
      />
      <Swiper spaceBetween={2} slidesPerView={4} style={{ position: 'absolute', bottom: 0, width: '100%', padding: '10px 0'}}>
        {images.map((img, index) => (
          <SwiperSlide style={{ display:'flex', flexDirection:' row' }} key={index} onClick={() => setSelectedImage(img.images)}>
            <CardMedia
              component="img"
              image={img.images}
              alt={`Thumbnail ${index}`}
              sx={{
                width: '100%',
                height: '90px',
                objectFit: 'contain',
                cursor: 'pointer',
                border: selectedImage === img.images ? '2px solid blue' : 'none',
                borderRadius: '4px',
                display:'flex', flexDirection:' row'
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default ImageCarousel;
