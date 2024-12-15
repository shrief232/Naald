import { Avatar, Box } from '@mui/material'
import logo from '../../assets/logo/logo_icon.svg'
import logo_dark from '../../assets/logo/logo_icon_dark.svg'
import { useThemeToggle } from '../hooks-form/ToggleProvider'



const CardLogo = () => {
 const {mode} = useThemeToggle();

  return (
    <>
        <Avatar
          src={mode === 'dark' ? logo : logo_dark }
          alt="Logo Icon"
          sx={{ width: '100%', height: '100%', bgcolor: mode === 'dark' ?  '#000':'#fff' }}
        />
      
    </>
  )
}

export default CardLogo