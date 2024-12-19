import React from 'react'
import { Box, Button, Typography } from '@mui/material'
import WelcomePage from '../Welcome/WelcomePage'
import BaseBar from '../../components/Header/BaseBar'
import { useNavigate } from 'react-router-dom'
import { useThemeToggle } from '../../components/hooks-form/ToggleProvider'


export default function AboutusPage() {
  const navigate = useNavigate();
  const {mode} = useThemeToggle();

  const handleClick = () => {
    navigate('/main/');
  }

  return (
    <Box>  
      <BaseBar />        
      <Box sx={{
        width:'100%', 
        display:'flex', 
        flexDirection:'column', 
        alignItems:'center'
        }}>
        <Button 
        onClick={handleClick}
        sx={{
          width:'200px',
          mt: '10rem',
          bgcolor: mode === 'dark' ? '#f5decc': '#183a27'
          }}>
          <Typography color={ mode === 'dark' ? '#000': '#fff'}>
            Go shop
          </Typography>        
        </Button>
      </Box>
    </Box>
  )
}
