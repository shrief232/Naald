import { Box, CardMedia, Typography, Grid, Rating, Paper, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CircularLoader from '../../components/Loader/CircularProgress';
import api from '../../api';
import { useParams } from 'react-router-dom';
import AddToCartBtn from '../../components/Buttons/Extrabuttons/AddToCartBtn';
import AddToWishlistBtn from '../../components/Buttons/Extrabuttons/AddToWishBtn';
import InstallmentDetails from '../../components/Dialogs/InstallmentDetails';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Thumbs } from 'swiper/modules';

export default function SwiperProduct() {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await api.get(`/api/core/products/${id}/`);
                if (response.status === 200) {
                    setProduct(response.data);
                    setSelectedImage(response.data.image);
                } else {
                    setError('Product not found.');
                }
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('Failed to fetch product.');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchProduct();
        } else {
            setError('No product ID provided.');
            setLoading(false);
        }
    }, [id]);

    const handleImageClick = (newImage) => {
        setSelectedImage(newImage);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <CircularLoader />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                <Typography variant="h6" color="error">{error}</Typography>
            </Box>
        );
    }

    if (!product) {
        return <Typography variant="h6" align="center">No product found.</Typography>;
    }

    return (
        <Paper sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', m: 5, p: 3, borderRadius: 2 }}>
    <Box sx={{ width: '100%', mb: 4 }}>
        <Grid container spacing={4}>
            {/* Image and Thumbnail Grid */}
            <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
                {/* Small Images Vertical Slider */}
                <Swiper sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '30%' }}>
                    {product.images.map((img, index) => (
                        <SwiperSlide key={index} onClick={() => handleImageClick(img.images)}>
                            <CardMedia
                                component="img"
                                image={img.images}
                                alt={`Product Image ${index}`}
                                sx={{
                                    width: '100%',
                                    height: 70,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    border: selectedImage === img.images ? '2px solid blue' : 'none',
                                    transition: 'border 0.2s',
                                }}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Main Image */}
                <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
                    <Swiper loop={true} spaceBetween={10} navigation modules={[Navigation, Thumbs]} grabCursor={true} >
                        {product.images.map((selectedImage, index) => (
                            <SwiperSlide style={{position:'relative', overflow: 'hidden', paddingTop:'70%'}}>
                                <CardMedia
                                    component="img"
                                    image={selectedImage || product.images[0]?.images} 
                                    alt={product.title}
                                    sx={{
                                        width: '100%%',
                                        height: 'auto',
                                        maxHeight: 400,
                                        objectFit: 'contain',
                                        borderRadius: 2,
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                    }}
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <Box sx={{ display: 'flex', gap: 1, pt: 2, width: '80%' }}>
                        <AddToCartBtn product={product} quantity={1} sx={{ flex: 1 }} />
                        <AddToWishlistBtn product={product} sx={{ flex: 1 }} />
                    </Box>
                </Grid>
            </Grid>

            {/* Product Info */}
            <Grid item xs={12} md={6} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="h4" gutterBottom color='text.secondary'>{product.title || 'Default Title'}</Typography>
                    <Typography variant="body1" paragraph>{product.description || 'Default Description'}</Typography>
                    <Typography variant="h6">
                        <Typography variant="caption" color='text.secondary'>Now: </Typography> ${product.price} 
                        <Typography variant="caption" color='text.secondary'> (Inclusive of VAT)</Typography>
                    </Typography>
                    <Typography variant="caption" color='text.secondary'><span>Before: </span>${product.old_price}</Typography>
                    <Typography variant="body1" paragraph>Express <Typography variant="caption" color='text.secondary'>Get it Tomorrow</Typography></Typography>
                    <Typography variant="caption" color='text.secondary'>Monthly payment plans from EGP 98 <InstallmentDetails /></Typography>
                    
                </Box>
                <Box sx={{ mt: 2 }}>
                    <Typography variant="h6">Rating:</Typography>
                    <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
                </Box>
            </Grid>
        </Grid>
    </Box>
    <Divider orientation="vertical" flexItem />
    
</Paper>

    );
}
