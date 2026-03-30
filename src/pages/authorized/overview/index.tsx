import { Box, Typography, Grid, Card, CardContent, Stack, Chip } from '@mui/material';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import SpeedIcon from '@mui/icons-material/Speed';
import SecurityIcon from '@mui/icons-material/Security';

const features = [
  {
    title: 'Production Ready',
    desc: 'Pre-configured with best practices, linting, formatting, and scalable architecture.',
    icon: <RocketLaunchIcon fontSize='large' />
  },
  {
    title: 'Scalable Structure',
    desc: 'Feature-based folder structure designed for large-scale applications.',
    icon: <ArchitectureIcon fontSize='large' />
  },
  {
    title: 'High Performance',
    desc: 'Built with Vite for lightning-fast development and optimized builds.',
    icon: <SpeedIcon fontSize='large' />
  },
  {
    title: 'Best Practices',
    desc: 'Includes ESLint, Prettier, Husky, and clean code standards out of the box.',
    icon: <SecurityIcon fontSize='large' />
  }
];

export default function Overview() {
  return (
    <Box p={4}>
      {/* HERO SECTION */}
      <Stack spacing={2} mb={5}>
        <Typography variant='h4' fontWeight={700}>
          Vite React Starter
        </Typography>
        <Typography variant='h6' color='text.secondary'>
          A modern, production-ready React starter built with scalability, performance, and developer experience in
          mind.
        </Typography>
      </Stack>

      {/* FEATURES */}
      <Grid container spacing={3} mb={6}>
        {features.map((item, index) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Card
              sx={{
                height: '100%',
                borderRadius: 3,
                transition: '0.3s',
                '&:hover': {
                  boxShadow: 6,
                  transform: 'translateY(-4px)'
                }
              }}>
              <CardContent>
                <Stack spacing={2}>
                  {item.icon}
                  <Typography variant='h6' fontWeight={600}>
                    {item.title}
                  </Typography>
                  <Typography variant='body2' color='text.secondary'>
                    {item.desc}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* WHY SECTION */}
      <Box mb={6}>
        <Typography variant='h4' fontWeight={600} mb={2}>
          Why this starter?
        </Typography>

        <Typography color='text.secondary' maxWidth='800px'>
          Starting a React project from scratch every time leads to inconsistent architecture, missing best practices,
          and wasted time. This starter eliminates that by providing a strong foundation with pre-integrated tools,
          scalable folder structure, and clean coding standards so you can focus on building features instead of setup.
        </Typography>
      </Box>

      {/* TECH STACK PREVIEW */}
      <Box>
        <Typography variant='h4' fontWeight={600} mb={2}>
          What’s Inside?
        </Typography>

        <Grid container spacing={2}>
          {[
            'React 19',
            'TypeScript',
            'Vite',
            'MUI v7',
            'React Query',
            'React Router v7',
            'ESLint + Prettier',
            'Husky + Lint-Staged'
          ].map((tech, i) => (
            <Grid key={i}>
              <Chip label={tech} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}
