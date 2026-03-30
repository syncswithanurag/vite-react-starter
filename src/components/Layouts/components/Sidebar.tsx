import { Drawer, List, Box, useTheme, useMediaQuery } from '@mui/material';
import SidebarItem from './SidebarItem';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import BuildIcon from '@mui/icons-material/Build';
import * as urls from '../../../routes/config';
import AccountTreeIcon from '@mui/icons-material/AccountTree';

interface Props {
  isMenuOpen?: boolean;
  handleClose?: () => void;
}

export default function SimpleSidebar({ isMenuOpen, handleClose }: Props) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'permanent'}
      open={isMobile ? isMenuOpen : true}
      onClose={handleClose}
      anchor='left'
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          top: isMobile ? 0 : '64px',
          height: isMobile ? '100%' : 'calc(100% - 64px)',
          boxSizing: 'border-box',
          backgroundColor: theme.palette.background.paper
        }
      }}
      ModalProps={{ keepMounted: true }}>
      <Box sx={{ mt: 2 }}>
        <List>
          <SidebarItem to={`${urls.platform.base}`} icon={<DashboardIcon />} label='Overview' end />
          <SidebarItem
            to={`${urls.platform.base}/${urls.platform.configurations}`}
            icon={<SettingsIcon />}
            label='Configurations'
          />
          <SidebarItem
            to={`${urls.platform.base}/${urls.platform.folderStructure}`}
            icon={<AccountTreeIcon />}
            label='Folder Structure'
          />
          <SidebarItem
            to={`${urls.platform.base}/${urls.platform.makeYours}`}
            icon={<BuildIcon />}
            label='Make Yours'
          />
        </List>
      </Box>
    </Drawer>
  );
}
