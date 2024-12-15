import React from 'react'
import SwiperProduct from '../../components/Swiper/Swiper'
import UserProfile from './UserProfile'
import { Box, Card } from '@mui/material'
import ProfileInfo from './ProfileInfo'
import ProfilePayment from './profilePayment';
import EditProfileDialog from './EditProfileDialog'
import OrderHistory from './OrdersHistory'
import OrderPending from './OrderPending'
import UserNameCard from '../../components/Avatar/UserNameCard'

export default function ProfilePage() {
  return (
    <Box sx={{width:'100%', justifyContent:'center', display:'flex',  ml: 3, gap: 3 }}>
      <UserNameCard/>
      <Box sx={{width:'45%'}}>
         <ProfileInfo/>
         <OrderHistory/>
         <OrderPending/>
      </Box>
      <Box sx={{ width: "25%", padding: 1 }}>
        <ProfilePayment/>
      </Box>
      
    </Box>
  )
}
