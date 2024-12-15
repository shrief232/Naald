import { Box } from '@mui/material'
import React from 'react'
import logo from '../../assets/logo/logo_icon.svg'

const FooterLogo = () => {
  return (
    <>

      <Box sx={{width:'300px', height:'100px' }}>
        <img
          src={logo}
          alt="Logo Icon"
          style={{ width: '100%', height: 'auto' }}
        />
      </Box> 
    </>
  )
}

export default FooterLogo
