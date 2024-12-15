import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import LoginBtn from '../Buttons/LoginBtn';
import { Link } from 'react-router-dom';
import { $isAuthorized } from '../../Atoms/authAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Favourite from '../../components/icons/Favourite';
import ShippingCart from '../../components/icons/ShippingCart';
import AccountMenu from '../../components/AccountMenu/AccountMenu';
import UserName from '../../components/Avatar/UserName';
import { cartState } from '../../Atoms/CartAtom';
import BarLogo2 from '../logo/BarLogo2';
import { useThemeToggle } from '../hooks-form/ToggleProvider';

export default function BaseBar() {
    const [auth] = useRecoilState($isAuthorized);
    const cart = useRecoilValue(cartState);
    const totalQuantity = cart.reduce((total, item) => total + item.qty, 0);
    const { mode } = useThemeToggle();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{
        bgcolor: mode === 'dark' ? '#030a06' : '#bc9679',
        
        }}>
        <Toolbar sx={{gap:1, display:'flex', justifyContent:'space-between', alignItems:'center'}}>
          <Box
            size="large"
            aria-label="menu"
            sx={{ mr: 1 }}
          >
           <BarLogo2/>
          </Box>
          {/* <Typography variant="body1" component="div" sx={{ flexGrow: 1 }}>
            Contact Us
          </Typography> */}
          {auth?.isAuth ? (
              <Box sx={{display:'flex'}}>
                <Favourite quantity={totalQuantity} />
                <ShippingCart quantity={totalQuantity} />
                <AccountMenu />
                <UserName />
              </Box>
            ) : (
                <Box sx={{display:'flex', alignItems:'center', mr:'2rem'}}>
                    <Link to='/main/' style={{textDecoration:'none'}}>
                        <Typography variant='body1' color={mode === 'dark' ? '#f5decc': '#183a27' }>
                            Shop
                        </Typography>
                        </Link>
                <LoginBtn />
                </Box>
            )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
