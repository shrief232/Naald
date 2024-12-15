import React, { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Stack, Typography, Link, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import RHFCode from '../components/hooks-form/RHFCode';
import api from '../api';
import { toast } from 'react-toastify';

const verificationSchema = Yup.object().shape({
    code1: Yup.string().required('Code is required'),
    code2: Yup.string().required('Code is required'),
    code3: Yup.string().required('Code is required'),
    code4: Yup.string().required('Code is required'),
    code5: Yup.string().required('Code is required'),
    code6: Yup.string().required('Code is required'),
});

export default function AuthVerifyRegister() {
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const methods = useForm({
        resolver: yupResolver(verificationSchema),
        mode: 'onChange',
        defaultValues: {
            code1: '',
            code2: '',
            code3: '',
            code4: '',
            code5: '',
            code6: '',
            email: '',
        },
    });

    const { handleSubmit, getValues, formState: { isSubmitting: isFormSubmitting, isValid, errors } } = methods;

    const onSubmit = async (data) => {
        setIsSubmitting(true);
        try {
            const verificationCode = `${data.code1}${data.code2}${data.code3}${data.code4}${data.code5}${data.code6}`;
            await api.post('/api/user/verify/', {
                code: verificationCode,
                email: data.email,
            });
            toast.success('Email verified successfully!');
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Verification failed');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleResendCode = async () => {
        setIsResendDisabled(true);
        try {
            await api.post('/api/user/resend-verification/', { email: getValues('email') });
            toast.success('Verification code resent. Please check your inbox.');
        } catch (error) {
            toast.error(error.response?.data?.detail || 'Failed to resend verification code');
        } finally {
            setIsResendDisabled(false);
        }
    };

    return (
        <FormProvider {...methods}>
            <Stack spacing={3}>
                <Typography variant="h6">Enter the verification code sent to your email</Typography>
                <Stack onSubmit={handleSubmit(onSubmit)}>
                    <Stack direction="row" spacing={1}>
                        <RHFCode name="code1" />
                        <RHFCode name="code2" />
                        <RHFCode name="code3" />
                        <RHFCode name="code4" />
                        <RHFCode name="code5" />
                        <RHFCode name="code6" />
                    </Stack>
                    <FormHelperText sx={{ mt: 1, mb: 1 }}>
                        {errors.code1 && 'Please enter all six code fields'}
                    </FormHelperText>
                    <LoadingButton
                        fullWidth
                        color="inherit"
                        size="large"
                        type="submit"
                        variant="contained"
                        loading={isSubmitting}
                        disabled={!isValid || isSubmitting}
                    >
                        Verify Email
                    </LoadingButton>
                    <Link component="button" variant="body2" onClick={handleResendCode} disabled={isResendDisabled}>
                        Resend code
                    </Link>
                </Stack>
                
            </Stack>
        </FormProvider>
    );
}
