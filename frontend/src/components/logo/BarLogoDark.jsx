import { Avatar, Box } from '@mui/material'
import logo_dark from '../../assets/logo/logo_icon_dark.svg'




const BarLogoDark = () => {


  return (
    <>

      <Box sx={{width:'400px', height:'150px'  }}>
        <img
          src={logo_dark}
          alt="Logo Icon"
          style={{ width: '100%', height: 'auto' }}
        />
        
      </Box> 
    </>
  )
}

export default BarLogoDark
