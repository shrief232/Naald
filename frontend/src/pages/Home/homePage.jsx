import { Box, Typography } from '@mui/material'
import React from 'react'
import HeroSection from '../../components/HeroSection/HeroSection';
import Introduction from '../../components/introduction/Introduction';
import SearchBar from '../../components/Search/SearchBar';
import BarLogo from '../../components/logo/BarLogo';
import BarLogoDark from '../../components/logo/BarLogoDark';
import { useThemeToggle } from '../../components/hooks-form/ToggleProvider';





export default function HomePage() {

  const { mode } = useThemeToggle();

  return (
    <Box sx={{width:'100%', display:'flex', flexDirection:'column', alignItems:'center', mt:'1rem'}}>
      <Box sx={{width:'100%', display:'flex', gap: 30, alignItems:'center'}}>
          {mode === 'dark'? (<BarLogo />) : (<BarLogoDark/> )} 
          <Box sx={{width:'30%', height:'70px'}}>
             <SearchBar />
          </Box>        
           
        </Box>
      <Box sx={{width:'100%', mb:'1rem', mt:'1rem'}}>
        <HeroSection/>
      </Box>     
      <Introduction/>  
    </Box>
  ) 
}
