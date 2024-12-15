// GoogleSignUpButton.js
import React from 'react';
import { Button } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
import { toast } from 'react-toastify';
import GoogleIcon from '@mui/icons-material/Google';

const GoogleSignUpButton = ({ handleGoogleSuccess }) => {
    const googleLogin = useGoogleLogin({
        onSuccess: handleGoogleSuccess,
        onError: () => toast.error('Google login failed'),
    });

    return (
        <Button
            variant="contained"
            fullWidth
            sx={{
                justifyContent: 'center',
                color: 'black',
                bgcolor: 'white',
                padding: '10px',
            }}
            onClick={googleLogin} 
        >
            <GoogleIcon sx={{ mr: 1 }} />  
            Sign up with Google
        </Button>
    );
};

export default GoogleSignUpButton;
