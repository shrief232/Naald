import React from 'react';
import MuiAppBar from '@mui/material/AppBar'; // Renamed import
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import BarLogo from '../../logo/BarLogo';
import { Link, useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { $isAuthorized } from '../../../Atoms/authAtom';
import ToggleButton from '../../Buttons/ToggleButton';

export default function ButtonAppBar() {
 
  

  return (
    <Box >
      <MuiAppBar position="static" sx={{ bgcolor: 'inherit', display: 'flex', alignContent: 'center' }}>
        <Toolbar sx={{ display: 'flex', alignContent: 'center', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1, pl: 1 }}>
            <BarLogo />
          </Typography>

            <Link
              to='/aboutus'
              style={{
                pr: 4,
                color: '#a28369',
                fontFamily: 'Calora',
                textDecoration: 'none',
                fontSize: '1.2em'
              }}
            >
              About Us
            </Link>
         
            <Link
              to='/login'
              style={{
                pr: 4,
                color: '#a28369',
                fontFamily: 'Calora',
                textDecoration: 'none',
                fontSize: '1.2em'
              }}
            >
              Login
            </Link>
          
          <ToggleButton />
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
