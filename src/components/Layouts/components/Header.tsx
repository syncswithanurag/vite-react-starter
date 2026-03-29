import { Box, Typography } from '@mui/material';

export default function Header({ children }: any) {
  return (
    <Box>
      <Typography>Header</Typography>
      {children}
    </Box>
  );
}
