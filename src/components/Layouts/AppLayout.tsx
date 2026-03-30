import { Stack } from '@mui/material';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

export default function AppLayout({ children }: any) {
  return (
    <Header>
      <Stack direction='row'>
        <Sidebar />
        {children}
      </Stack>
    </Header>
  );
}
