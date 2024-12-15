import { Box, CardMedia, Typography, Grid, Rating, Paper, Divider, Button, Card } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CircularLoader from '../../components/Loader/CircularProgress';
import api from '../../api';
import { useParams } from 'react-router-dom';
import AddToCartBtn from '../../components/Buttons/Extrabuttons/AddToCartBtn';
import AddToWishlistBtn from '../../components/Buttons/Extrabuttons/AddToWishBtn';
import InstallmentDetails from '../../components/Dialogs/InstallmentDetails';
import SizeSelection from '../../components/Sections/SizeSelection';
import ColorSelection from '../../components/Sections/ColorSelection';
import SellerInfo from '../../components/details/SellerInfo';
import ProductOverview from '../../components/details/Overview';
import ProductReviews from '../../components/details/ProductReviews';

export default function SingleProduct() {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(null);
    const { id } = useParams();
    const [imageTransition, setImageTransition] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            setError(null);

            await new Promise((resolve) => setTimeout(resolve, 1000));

            try {
                const response = await api.get(`/en/core/products/${id}/`);
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
        setImageTransition(true);
        setTimeout(() => {
            setSelectedImage(newImage);
            setImageTransition(false);
        }, 300);
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
        <Box sx={{mr: 4, p:0, width:'95%'}}>
        <Paper sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', width:'100%', mt:'1rem'}}>
            <Box sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                justifyContent: 'space-around',
                mt: '3rem',
                padding: '3rem',
                borderRadius: 2,
                width: '100%',
                maxWidth: '1100px',
                position: 'relative',
            }}>
                {/* Image Section */}
                <Grid container spacing={1}>
                    {/* Thumbnail Images */}
                    <Grid item xs={12} md={1} >
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                            {product.images.map((img, index) => (
                                <CardMedia
                                    key={index}
                                    component="img"
                                    image={img.images}
                                    alt={`Product Image ${index}`}
                                    onClick={() => handleImageClick(img.images)}
                                    sx={{
                                        width: '80%',
                                        height: 100,
                                        cursor: 'pointer',
                                        borderRadius: 2,
                                        border: selectedImage === img.images ? '2px solid gray' : 'none',
                                        transition: 'border 0.2s',
                                    }}
                                />
                            ))}
                        </Box>
                    </Grid>

                    {/* Main Product Image */}
                    <Grid item xs={12} md={4} sx={{ position: 'sticky', bottom: '0' }}>
                        <CardMedia
                            component="img"
                            image={selectedImage || product.image}
                            alt={product.title}
                            sx={{
                                width: '100%',
                                height: '450px',
                                objectFit: 'contain',
                                borderRadius: '5px',
                                border: '1px solid gray',
                                transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
                                transform: imageTransition ? 'scale(0.9)' : 'scale(1)',
                                opacity: imageTransition ? 0.5 : 1,
                            }}
                        />
                        <Box sx={{ display: 'flex', gap: 1, pt: 2 }}>
                            <AddToCartBtn product={product} quantity={1} />
                            <AddToWishlistBtn product={product} />
                        </Box>
                    </Grid>

                    {/* Product Details Section */}
                    <Grid item xs={12} md={5} sx={{ ml: 5 }}>
                        <Typography variant="h5" gutterBottom color="text.secondary">{product.title}</Typography>
                        <Typography variant="h5" paragraph>{product.description}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            Price: ${product.price} <Typography variant="caption">(Inclusive of VAT)</Typography>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Before: ${product.old_price}
                        </Typography>
                        <Typography variant="body1" color="text.secondary" paragraph>
                            Express Delivery: Get it Tomorrow
                        </Typography>
                        <Typography variant="body2" paragraph>
                            Monthly payment plans starting from EGP 98 <InstallmentDetails />
                        </Typography>
                        <Typography variant="body2" paragraph>
                            Rating: <Rating value={product.rating} readOnly />
                        </Typography>

                        {/* Vendor and Shipping Details */}
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle2" color="text.secondary">
                            Sold by: <strong>{product?.vendor?.name || 'Unknown Vendor'}</strong>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Vendor Rating: <Rating value={product?.vendor?.rating || 0} readOnly />
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            Partner Since: {product?.vendor?.yearsOnPlatform || 0}+ Years
                        </Typography>
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Free Returns on eligible items
                            </Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                Trusted Shipping with secure checkout
                            </Typography>
                        </Box>
                        <Box>
                            <Card>
                                <SizeSelection />
                            </Card>
                        </Box>
                        <Box>
                            <Card>
                                <ColorSelection />
                            </Card>
                        </Box>
                    </Grid> 
                </Grid> 
                <Divider orientation="vertical" flexItem />     
            </Box>
    
            <SellerInfo /> 
        </Paper>
        <ProductOverview />
        <ProductReviews />
        </Box>                     
    );
}
