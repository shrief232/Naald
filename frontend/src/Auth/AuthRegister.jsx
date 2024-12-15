import React, { useState } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Box, InputAdornment, IconButton, Dialog, useMediaQuery, useTheme } from '@mui/material';
import RHFTextField from '../components/hooks-form/RHFTextField';
import CustomFormProvider from '../components/hooks-form/FormProvider';
import api from '../api';
import { toast } from 'react-toastify';
import { Icon } from '@iconify/react';
import { LoadingButton } from '@mui/lab';
import LoginDialog from '../Join/LoginPage';

export default function AuthRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    const [isDialogOpen, setDialogOpen] = useState(false);

    const handleOpenDialog = () => setDialogOpen(true);
    const handleCloseDialog = () => setDialogOpen(false);

    // Validation schema for email registration
    const RegisterSchema = Yup.object().shape({
        username: Yup.string().required('Name is required'),
        email: Yup.string().email('Must be a valid email').required('Email is required'),
        phone: Yup.string().matches(/^\+?[1-9]\d{1,14}$/, 'Phone number is not valid') 
        .required('Phone number is required'),
        password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
    });

    const methods = useForm({
        resolver: yupResolver(RegisterSchema),
        defaultValues: {
            username: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
        },
    });

    const { handleSubmit } = methods;

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await api.post('/en/api/register/', {
                username: data.username,
                email: data.email,
                phone: data.phone,
                password: data.password,
                password2: data.confirmPassword,
            });
            toast.success('Registered successfully');
            console.log(data); 
            handleOpenDialog();
        } catch (error) {
            toast.error(
                error.response?.data?.detail || error.response?.data?.message || 'An error occurred'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Box spacing={3} maxWidth="500px">
                <CustomFormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Stack spacing={3} sx={{ width: isMobile ? '100%' : '450px' }}>
                        <RHFTextField name="username" placeholder="Enter your name" />
                        <RHFTextField name="email" placeholder="Enter your email" />
                        <RHFTextField name="phone" placeholder="Enter your phone number" />
                        <RHFTextField
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Enter your password"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                            <Icon icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <RHFTextField
                            name="confirmPassword"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Confirm password"
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
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
                            Register
                        </LoadingButton>
                    </Stack>
                </CustomFormProvider>
            </Box>
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <LoginDialog open={isDialogOpen} onClose={handleCloseDialog} />
            </Dialog>
        </>
    );
}
