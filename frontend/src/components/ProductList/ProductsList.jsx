import React, { useEffect, useState, useRef } from 'react';
import api from '../../api'; 
import Typography from '@mui/material/Typography'; 
import { Grid, Container, Box } from '@mui/material'; 
import ProductCard from '../card/Card';
import CircularLoader from '../Loader/CircularProgress'; 
import '../../style/animations.css'; 
import ProductCardSkeleton from '../Skeleton/ProductCardSkeleton';

export default function ProductList({}) {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [animate, setAnimate] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => { 
      setError(null); 

      try {
        const response = await api.get('/en/core/products/?category__title=Men'); 
        setTimeout(() => {
          setProducts(response.data);
          setAnimate(Array(response.data.length).fill(false));
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products.');
        setLoading(false);
      }
    };

    fetchProducts(); 
  }, []); 

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index'), 10);
          setAnimate((prev) => {
            const newArray = [...prev];
            newArray[index] = true;
            return newArray;
          });
          observer.unobserve(entry.target); 
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect(); 
  }, [products]);

  if (loading) {
    return (
      <Container sx={{ py: 6, px: { xs: 2, sm: 3, lg: 1 } }}>
        <Grid container spacing={2}>
          {Array.from(new Array(8)).map((_, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <ProductCardSkeleton />
            </Grid>
          ))}
        </Grid>
      </Container>
    );
  }

  return (
    <Container sx={{ py: 6, px: { xs: 2, sm: 3, lg: 1 } }}>
      {error && <Typography color="error">{error}</Typography>}
      {products.length === 0 ? (
        <Typography>No products available.</Typography>
      ) : (
        <Grid container spacing={2}>
          {products.map((product, index) => (
            <Grid 
              item 
              xs={12} 
              sm={6} 
              md={4} 
              lg={3} 
              key={product.id} 
              data-index={index}
              className={`animate-on-scroll ${animate[index] ? 'fade-in-up' : ''}`}
              style={{ animationDelay: `${index * 100}ms` }} 
            >
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
