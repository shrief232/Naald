import React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import MiniDrawer from '../../components/Drawer/MiniDrawer';
import { useRecoilValue } from 'recoil';
import { $isAuthorized } from '../../Atoms/authAtom';
import { Outlet } from 'react-router-dom';
import ScrollToTopButton from '../../components/scroll/ScrollToTopButton';
import Footer from '../../components/Footer/Footer';
import SearchBar from '../../components/Search/SearchBar';

export default function MainLayout() {
  const isAuthorized = useRecoilValue($isAuthorized);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerToggle = (open) => {
    setDrawerOpen(open);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column'}}>
      <MiniDrawer onDrawerToggle={handleDrawerToggle} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          display: 'flex', flexDirection: 'column',
          mt:'5rem',
          transition: 'margin-left 0.3s ease',
          marginLeft: drawerOpen ? '240px' : '72px',
        }}
      >
        
        <Outlet />
        <ScrollToTopButton />
        <Footer />
      </Box>
    </Box>
  );
}
