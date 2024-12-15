import React, { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { $isAuthorized } from '../../Atoms/authAtom';
import { Dialog } from '@mui/material';
import LoginDialog from '../../Join/LoginPage';
import { useNavigate } from 'react-router-dom';

function IsLoggedin({ children }) {
    const [isAuthorized] = useRecoilState($isAuthorized);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const navigate = useNavigate();

    const handleCloseDialog = () => {
        setDialogOpen(false)
        navigate('/aboutus');
    };

   
    useEffect(() => {
        if (!isAuthorized?.isAuth) {
            
            setDialogOpen(true); 
            

        }
    }, [isAuthorized]); 

    
    if (!isAuthorized?.isAuth) {
        return (
            <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
                <LoginDialog open={isDialogOpen} onClose={handleCloseDialog} />
            </Dialog>
        );
    }

   
    return <div>{children}</div>;
}

export default IsLoggedin;
