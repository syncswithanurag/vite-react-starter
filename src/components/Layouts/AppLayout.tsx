import { Box } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function AppLayout({ children }: any) {
  return (
    <Header>
      <Box>
        <Sidebar />
        {children}
      </Box>
    </Header>
  );
}
