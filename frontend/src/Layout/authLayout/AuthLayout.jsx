import { Box } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import ButtonAppBar from '../../components/Header/appBar/AppBar'

export default function AuthLayout() {
  return (
    <Box>
      <ButtonAppBar/>
      <Outlet/>
    </Box>
  )
}
