import {
  Box,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  Link,
  Paper,
  Stack
} from '@mui/material';

const packages = [
  {
    name: 'react',
    type: 'dependency',
    reason: 'Core library for building UI',
    link: 'https://react.dev'
  },
  {
    name: 'vite',
    type: 'dev',
    reason: 'Fast bundler & dev server',
    link: 'https://vitejs.dev'
  },
  {
    name: '@mui/material',
    type: 'dependency',
    reason: 'UI component library for faster development',
    link: 'https://mui.com'
  },
  {
    name: '@tanstack/react-query',
    type: 'dependency',
    reason: 'Server state management & caching',
    link: 'https://tanstack.com/query'
  },
  {
    name: 'react-router-dom',
    type: 'dependency',
    reason: 'Routing solution for SPA navigation',
    link: 'https://reactrouter.com'
  },
  {
    name: 'eslint',
    type: 'dev',
    reason: 'Code linting & error detection',
    link: 'https://eslint.org'
  },
  {
    name: 'prettier',
    type: 'dev',
    reason: 'Code formatting for consistency',
    link: 'https://prettier.io'
  },
  {
    name: 'husky',
    type: 'dev',
    reason: 'Git hooks to enforce code quality',
    link: 'https://typicode.github.io/husky'
  },
  {
    name: 'lint-staged',
    type: 'dev',
    reason: 'Run linters on staged files only',
    link: 'https://github.com/okonet/lint-staged'
  },
  {
    name: 'js-cookie',
    type: 'dependency',
    reason: 'Easy cookie handling',
    link: 'https://github.com/js-cookie/js-cookie'
  }
];

export default function Configurations() {
  return (
    <Box p={4}>
      {/* HEADER */}
      <Stack spacing={2} mb={4}>
        <Typography variant='h4' fontWeight={700}>
          Configurations
        </Typography>
        <Typography variant='body1' color='text.secondary'>
          This section lists all the core packages used in this starter along with their purpose and reference links.
          Each dependency is carefully selected to ensure scalability, performance, and developer experience.
        </Typography>
      </Stack>

      {/* TABLE */}
      <Paper sx={{ borderRadius: 3, overflow: 'hidden' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.100' }}>
              <TableCell>
                <b>Package</b>
              </TableCell>
              <TableCell>
                <b>Type</b>
              </TableCell>
              <TableCell>
                <b>Why Used</b>
              </TableCell>
              <TableCell>
                <b>Reference</b>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {packages.map((pkg, index) => (
              <TableRow
                key={index}
                hover
                sx={{
                  '&:last-child td': { borderBottom: 0 }
                }}>
                <TableCell>
                  <Typography fontWeight={500}>{pkg.name}</Typography>
                </TableCell>

                <TableCell>
                  <Chip
                    label={pkg.type === 'dev' ? 'Dev' : 'Dependency'}
                    color={pkg.type === 'dev' ? 'warning' : 'primary'}
                    size='small'
                  />
                </TableCell>

                <TableCell>
                  <Typography variant='body2' color='text.secondary'>
                    {pkg.reason}
                  </Typography>
                </TableCell>

                <TableCell>
                  <Link href={pkg.link} target='_blank' underline='hover'>
                    Docs
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </Box>
  );
}
