import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { IconButton, InputAdornment, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Icon } from '@iconify/react';
import RHFTextField from '../components/hooks-form/RHFTextField';
import CustomFormProvider from '../components/hooks-form/FormProvider';
import { Link, useNavigate } from 'react-router-dom';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants';
import api from '../api';
import { useRecoilState } from 'recoil';
import { $isAuthorized } from '../Atoms/authAtom';
import GoogleSignUpButton from '../components/Buttons/GoogleSignUpButton';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { toast } from 'react-toastify';

export default function AuthLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isAuthorized, setIsAuthorized] = useRecoilState($isAuthorized);
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));


    const LoginSchema = Yup.object().shape({
        email: Yup.string().email('Must be a valid email').required('Email is required'),
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    });

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const { handleSubmit } = methods;

   const onSubmit = async (data) => {
    setLoading(true);
    try {
        const response = await api.post('/en/api/token/', {
            email: data.email,
            password: data.password
        });

        const { access, refresh, user } = response.data; 

        if (!access || !refresh) {
            throw new Error('Missing access or refresh token');
        }

        localStorage.setItem(ACCESS_TOKEN, access);
        localStorage.setItem(REFRESH_TOKEN, refresh);

        setIsAuthorized({
            isAuth: true,
            user: { ...user },
        });

        navigate('/welcome');
        toast.success('Login successful');
    } catch (error) {
        console.error('Login error:', error.response?.data || error.message);
        toast.error(error.response?.data?.detail || 'Login failed. Please try again.');
    } finally {
        setLoading(false);
    }
};



     // Google OAuth Success Handler
    // const handleGoogleSuccess = async (credentialResponse) => {
    //     console.log('Google Credential Response:', credentialResponse);
    //     const { credential } = credentialResponse;
    
    //     if (!credential) {
    //         console.error('No credential received');
    //         return toast.error('Failed to retrieve Google credential.');
    //     }
    
    //     try {
    //         const response = await api.post('/api/google_login/', { token: credential });
            
    //         localStorage.setItem(ACCESS_TOKEN, response.data.access_token);
    //         localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token);

    //         // Fetch user profile
    //         const profileResponse = await api.post('/api/profile/', {
    //             headers: {
    //                 Authorization: `Bearer ${response.data.access_token}`
    //             }
    //         });
    
    //         setIsAuthorized({
    //             isAuth: true,
    //             user: { ...response.data.user, profile: profileResponse.data },
    //         });
    
    //         navigate('/');
    //         toast.success('Google login successful');
    //     } catch (error) {
    //         console.error('Google login error:', error.response?.data || error.message);
    //         toast.error('Failed to log in with Google');
    //     }finally {
    //         setLoading(false);
    //     }
    // };
    
    
    return (
        <CustomFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3} sx={{ width: isMobile ? '100%' : '450px' }}>
                
                <RHFTextField name="email" placeholder="Enter your email" fullWidth />
                
                <RHFTextField
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Enter your password"
                    fullWidth
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end" sx={{ mr: 1 }}>
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                
                <LoadingButton
                    fullWidth
                    color="inherit"
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{
                        bgcolor: '#a28369',
                        color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                        '&:hover': {
                            bgcolor: '#c1ab99',
                            color: (theme) => (theme.palette.mode === 'light' ? 'common.white' : 'grey.800'),
                        },
                    }}
                    loading={loading}
                >
                    Login
                </LoadingButton>

                {/* Google Login */}
                {/* <GoogleOAuthProvider clientId="3285175824-gor10lv8u2q9cp9ia51dosvdog3tmnm7.apps.googleusercontent.com">
                    <GoogleSignUpButton handleGoogleSuccess={handleGoogleSuccess} />
                </GoogleOAuthProvider> */}

                {/* Links for Register and Forgot Password */}
                {/* <Typography>
                    Don't have an account? <Link style={{ color: 'inherit' }} onClick={handleOpenRegisterDialog} >Register</Link> &nbsp; | &nbsp; 
                    <Link style={{ color: 'inherit' }} to="#">Forgot Password?</Link>
                </Typography> */}
            </Stack>
        </CustomFormProvider>
    );
}
