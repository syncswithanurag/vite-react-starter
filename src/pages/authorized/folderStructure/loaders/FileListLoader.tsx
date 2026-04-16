import { Box, Skeleton } from '@mui/material';

interface FileListLoaderProps {
  rows?: number;
}

export function FileListLoader({ rows = 8 }: FileListLoaderProps) {
  return (
    <>
      {Array.from({ length: rows }).map((_, index) => (
        <Box key={index} px={2} py={1}>
          <Skeleton height={20} />
        </Box>
      ))}
    </>
  );
}
