import React from 'react';
import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import Logo from '../assets/IeltSLogo.png'; // Import the logo image
import { useNavigate } from 'react-router-dom'; 

const HeaderComponents: React.FC = () => {
  const userName = sessionStorage.getItem("user");
  const navigate = useNavigate(); // Initialize the navigate function

  const logOut = () => {
    sessionStorage.removeItem("user");
    navigate('/signin')
  }
  
  return (
    <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: '0'}}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo Section */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <img src={Logo} alt="Logo" style={{ 
            height: '60px',
            width: 'auto', 
            borderStyle: 'none',
            marginLeft: '25%'}} />
          <div>{userName}</div>
        </Box>

        {userName ?
          <Box  sx={{ display: 'flex', justifyContent: 'flex-end', }}>
            <Typography variant="body1" sx={{ color: "black", paddingRight: "20px" }}>
                Hello, {userName} 
            </Typography>
            <LogoutIcon onClick={logOut}  sx={{ color: 'black' }}/>
          </Box> 
          : null  } 
      </Toolbar>
    </AppBar>
  );
};

export default HeaderComponents;
