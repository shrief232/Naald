import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import { Icon } from '@iconify/react';
import BarLogo from '../logo/BarLogo';
import BarLogoDark from '../logo/BarLogoDark';
import { Link } from 'react-router-dom';
import SearchBar from '../Search/SearchBar';
import Favourite from '../icons/Favourite';
import AccountMenu from '../AccountMenu/AccountMenu';
import ShippingCart from '../icons/ShippingCart';
import { useRecoilState, useRecoilValue } from 'recoil';
import { cartState } from '../../Atoms/CartAtom';
import { $isAuthorized } from '../../Atoms/authAtom';
import LoginBtn from '../Buttons/LoginBtn';
import { useThemeToggle } from '../hooks-form/ToggleProvider';
import UserName from '../Avatar/UserName';


const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(5)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open, visible }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['top'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  top: visible ? 0 : '-64px',
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function MiniDrawer({ nav,  onDrawerToggle  }) {
  const [open, setOpen] = React.useState(false);
  const [visible, setVisible] = React.useState(true);
  const cart = useRecoilValue(cartState);
  const totalQuantity = cart.reduce((total, item) => total + item.qty, 0);
  const [lastScrollY, setLastScrollY] = React.useState(0);
  const [auth] = useRecoilState($isAuthorized);
 

 
  const { mode } = useThemeToggle();
  
  const handleDrawerOpen = () => {
    setOpen(true);
    onDrawerToggle(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    onDrawerToggle(false);
  };

  const getIcon = (index) => {
    const iconSize = 28;
    if (index % 4 === 0) {
      return <Icon icon="solar:home-bold" color={mode === 'dark' ? '#f5decc': '#183a27' } width={iconSize} height={iconSize} />;
    } 
    else if (index % 4 === 1) {
      return <Icon icon="solar:user-hand-up-bold" color={mode === 'dark' ? '#f5decc': '#183a27' } width={iconSize} height={iconSize} />;
    } 
    // else if (index % 4 === 2) {
    //   return <Icon icon="solar:bag-5-bold" color={mode === 'dark' ? '#f5decc': '#183a27' } width={iconSize} height={iconSize} />;
    // } 
    // else {
    //   return <Icon icon="solar:cart-large-2-bold" color={mode === 'dark' ? '#f5decc': '#183a27' } width={iconSize} height={iconSize} />;
    // }
  };

  const handleScroll = () => {
    const scrollY = window.scrollY;

    if (scrollY > lastScrollY) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setLastScrollY(scrollY);
  };

  React.useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

   

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed"  
      sx={{
        bgcolor: mode === 'dark' ? '#030a06' : '#bc9679',
        
        }} 
        open={open} 
        visible={visible}>
        <Toolbar >
          <IconButton
            aria-label="menu"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginLeft: '-20px',
              marginRight: 5,
              ...({ display: open ? 'none' : 'block' }),
            }}
          >
            <Icon icon="solar:hamburger-menu-bold" color= {mode === 'dark' ? '#f5decc': '#183a27' } />
          </IconButton>
          <Box sx={{width:'95%', display:'flex', justifyContent:'space-between'}}> 
            <Typography variant="h6" noWrap component="div">
            
            </Typography>
          
            {auth?.isAuth ? (
              <Box sx={{display:'flex'}}>
                <Favourite quantity={totalQuantity} />
                <ShippingCart quantity={totalQuantity} />
                <AccountMenu />
                <UserName />
              </Box>
            ) : (
              <Box sx={{display:'flex', alignItems:'center', gap:1}}>
                <Link to='/' style={{textDecoration:'none'}}>
                  <Typography variant='body1' color={mode === 'dark' ? '#f5decc': '#183a27' }>
                    About Us
                  </Typography>
                </Link>
                <LoginBtn />
              </Box>
            )}
          </Box> 
        </Toolbar>
      </AppBar>

      <Drawer
       variant="permanent" 
       open={open}
       sx={{
        '& .MuiDrawer-paper': {
        backgroundColor: mode === 'dark' ? '#0a1e13' : '#bc9679',
        color: mode === 'dark' ? '#fff' : 'gray',
        borderRight: '1px solid #424242',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
      },
          }} 
       >
        <DrawerHeader >
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon sx={{ display: open ? 'block' : 'none' }} />
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
         
        >
          {['Home'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <Link to={text === 'Home' ? '/main/' : `/${text.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: 'inherit',
                    }}
                  >
                    {getIcon(index)}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: mode === 'dark' ? '#f5decc': '#183a27' }} />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List >
          {['All mail', 'Trash', 'Spam'].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: 'block'  }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                  }}
                >
                  {index % 2 === 0 ? <Icon icon="mdi:email" color={mode === 'dark' ? '#f5decc': '#183a27' } width={24} height={24} /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0, color: mode === 'dark' ? '#f5decc': '#183a27' }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      
    </Box>
  );
}
