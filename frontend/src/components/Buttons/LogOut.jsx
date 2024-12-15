import {ListItemIcon, MenuItem } from '@mui/material';
import React from 'react';
import { useRecoilState } from 'recoil';
import { $isAuthorized } from '../../Atoms/authAtom';
import { useNavigate } from 'react-router-dom';
import { Logout } from '@mui/icons-material';

export default function LogOut() {
    const [isAuthorized, setIsAuthorized] = useRecoilState($isAuthorized);
    const navigate = useNavigate();
    
    const handleLogout = () => {
        setIsAuthorized({
            isAuthorized: false,
            user: null,
        });

        localStorage.removeItem('access'); 
        localStorage.removeItem('refresh'); 
        navigate('/main/'); 
        alert('Logged out successfully');
    };

    return (
        
           
        <MenuItem onClick={handleLogout}>
          <ListItemIcon >
            <Logout fontSize="small" sx={{ml:'5px'}} />
          </ListItemIcon>
          Logout
        </MenuItem>
        
    );
}
