import React from 'react'
import { Box } from '@mui/material'
import { Outlet } from 'react-router-dom';



export default function CoreLayout() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Outlet />
    </Box>
  )
}
