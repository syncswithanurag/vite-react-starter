import { Box, Typography, Stepper, Step, StepLabel, StepContent, Paper, Stack } from '@mui/material';

const steps = [
  {
    label: 'Clone the Repository',
    description: 'Start by cloning the starter repository to your local machine.',
    code: `git clone https://github.com/your-username/vite-react-starter.git`
  },
  {
    label: 'Install Dependencies',
    description: 'Install all required packages using npm or yarn.',
    code: `npm install`
  },
  {
    label: 'Run Development Server',
    description: 'Start the Vite development server.',
    code: `npm run dev`
  },
  {
    label: 'Setup Environment Variables',
    description: 'Create a .env file and add required environment variables.',
    code: `VITE_API_BASE_URL=https://api.example.com`
  },
  {
    label: 'Customize Project',
    description: 'Update project name, routes, theme, and remove dummyFeature to start building your own app.',
    code: `src/pages/dummyFeature → delete or replace`
  },
  {
    label: 'Build for Production',
    description: 'Generate optimized production build.',
    code: `npm run build`
  }
];

export default function MakeYours() {
  return (
    <Box p={4}>
      {/* HEADER */}
      <Stack spacing={2} mb={4}>
        <Typography variant='h4' fontWeight={700}>
          Make It Yours
        </Typography>
        <Typography color='text.secondary' maxWidth='700px'>
          Follow these steps to quickly set up and customize the starter for your own project.
        </Typography>
      </Stack>

      {/* STEPPER (ALL OPEN) */}
      <Stepper orientation='vertical'>
        {steps.map((step, index) => (
          <Step key={index} active expanded>
            <StepLabel>
              <Typography fontWeight={600}>{step.label}</Typography>
            </StepLabel>

            <StepContent>
              <Typography color='text.secondary' mb={2}>
                {step.description}
              </Typography>

              {/* CODE BLOCK */}
              <Paper
                sx={{
                  p: 2,
                  backgroundColor: '#0f172a',
                  color: '#fff',
                  fontFamily: 'monospace',
                  borderRadius: 2
                }}>
                {step.code}
              </Paper>
            </StepContent>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}
