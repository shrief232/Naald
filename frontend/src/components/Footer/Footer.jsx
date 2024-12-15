import React from 'react';
import { Box, Typography, Container, Grid, Link, Divider } from '@mui/material';
import { Facebook, Twitter, Instagram } from '@mui/icons-material';
import FooterLogo from '../logo/FooterLogo';
import BarLogoDark from '../logo/BarLogoDark';

const Footer = () => {
  return (
    <Box component="footer" sx={{ bgcolor: 'transparent', color: 'text.primary', py: 4, pt: 10 }}>
      <Divider />

      <Grid item xs={12} sm={4}>
            <Box display="flex" alignItems="flex-start" >
                <BarLogoDark />
            </Box>
            
        </Grid>
      <Container sx={{ pt: 1, pb: 10 }}>
        

        <Grid container spacing={4} sx={{ pt: 5 , display:'flex', justifyContent:'space-around', flexWrap:'nowrap'}} >
          
          
          {/* Links Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="div" gutterBottom>
              Links
            </Typography>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Home
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              About
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Contact
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Home
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              About
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Contact
            </Link>
          </Grid>
          {/* part 2 Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="div" gutterBottom>
              Employer
            </Typography>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Home
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              About
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Contact
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Home
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              About
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Contact
            </Link>
          </Grid>
          {/* part 3 Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="div" gutterBottom>
             Individual
            </Typography>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Home
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              About
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Contact
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Home
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              About
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Contact
            </Link>
          </Grid>
          {/* part 4 Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="div" gutterBottom>
              Resources
            </Typography>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Home
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              About
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Contact
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Home
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              About
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Contact
            </Link>
          </Grid>
          {/* part 5 Section */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="div" gutterBottom>
              Partners
            </Typography>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Home
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              About
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Contact
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Home
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              About
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Contact
            </Link>
          </Grid>
           {/* part 6 Section */}
           <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="div" gutterBottom>
              Company
            </Typography>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Home
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              About
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Contact
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Home
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              About
            </Link>
            <Link href="#" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 0.5 }}>
              Contact
            </Link>
          </Grid>

          {/* Social Media Links */}
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" component="div" gutterBottom>
              Follow Us
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Link href="#" color="inherit" aria-label="Facebook" sx={{ mr: 2 }}>
                <Facebook />
              </Link>
              <Link href="#" color="inherit" aria-label="Twitter" sx={{ mr: 2 }}>
                <Twitter />
              </Link>
              <Link href="#" color="inherit" aria-label="Instagram">
                <Instagram />
              </Link>
            </Box>
          </Grid>
          
        </Grid>
       
      </Container>
      <Divider />
       {/* subFooter */}
       <Grid sx={{display:'flex', justifyContent:'space-around'}}>
            <Box display="flex" justifyContent="space-around" sx={{ mt: 2 }}>
                <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Made with ��️ by Naald
                    </Typography>
                </Box>
                <Box>
                    <Typography variant="body2" sx={{ ml: 'auto', color: 'text.secondary' }}>
                        <Link href="#" color="inherit" underline="hover">
                            Back to Top
                        </Link>
                    </Typography>
                </Box>
            </Box>
            <Box sx={{gap: 2,display:'flex', justifyContent:'space-around', alignItems:' baseline'}}>
                <Typography variant="body2" sx={{ mt: 2, color: 'text.secondary' }}>
                  &copy; {new Date().getFullYear()} Company Name. All rights reserved.
                </Typography>
                <Link href="#" variant="caption" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 1 }}>
                  Terms & Conditions
                </Link>
                <Link href="#" variant="caption" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 1 }}>
                  Privacy Policy
                </Link>
                <Link href="#" variant="caption" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 1 }}>
                  Cookie Policy
                </Link>
                <Link href="#" variant="caption" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 1 }}>
                  Contact Us
                </Link>
                <Link href="#" variant="caption" color="text.secondary" underline="hover" sx={{ display: 'block', mt: 1 }}>
                  Help Center
                </Link>
            </Box>
        </Grid>
    </Box>
  );
};

export default Footer;
