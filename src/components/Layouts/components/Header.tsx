import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Box, Chip, IconButton, Menu, MenuItem, Stack } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Header = ({ children }: any) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    handleClose();
  };

  return (
    <Box>
      <AppBar position='static' elevation={2}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Left Section */}
          <Stack direction='row' alignItems='center' gap={1.5}>
            <Typography variant='h6' fontWeight='bold'>
              Vite React Starter
            </Typography>
            <Chip
              label='Ready to use'
              sx={{
                backgroundColor: '#00e676',
                height: 20,
                color: '#000',
                fontWeight: 'bold',
                boxShadow: '0 0 10px #00e676, 0 0 20px #00e676'
              }}
            />
          </Stack>

          {/* Right Profile Icon */}
          <Box>
            <IconButton color='inherit' onClick={handleMenuOpen}>
              <AccountCircle fontSize='large' />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right'
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}>
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {children}
    </Box>
  );
};

export default Header;
