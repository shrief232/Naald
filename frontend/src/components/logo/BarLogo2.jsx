import { Avatar, Box } from '@mui/material'
import logo from '../../assets/logo/logo_icon.svg'
import logo_dark from '../../assets/logo/logo_icon_dark.svg'
import { useThemeToggle } from '../hooks-form/ToggleProvider'



const BarLogo2 = () => {
 const mode = useThemeToggle;

  return (
    <>
          <Box
            sx={{
              width: '150px',
              minWidth: '100%',
              height: '60px',
              display: 'inline-flex',
              
            }}
          >
              <img
              src={mode === 'dark' ?   logo : logo_dark   }
              alt="Logo Icon"
              style={{ width: '100%', height: 'auto' }}
            />
            
          </Box>
    </>
  )
}

export default BarLogo2