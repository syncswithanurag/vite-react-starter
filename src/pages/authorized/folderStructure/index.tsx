import { Box, Grid, Typography } from '@mui/material';
import { useFolderStructure } from './apis/hooks';
import { ExplorerTreePanel } from './components/ExplorerTreePanel';
import { FilesPanel } from './components/FilesPanel';
import { PathBreadcrumbs } from './components/PathBreadcrumbs';

const OWNER = 'syncswithanurag';
const REPO = 'vite-react-starter';

export default function FolderStructure() {
  const { currentPath, files, tree, pathParts, loading, setCurrentPath } = useFolderStructure(OWNER, REPO);

  return (
    <Box
      px={3}
      py={2}
      sx={{
        width: '100%',
        maxWidth: '100%'
      }}>
      <Typography variant='h4' fontWeight={700} mb={1}>
        Folder Structure
      </Typography>

      <PathBreadcrumbs repoName={REPO} pathParts={pathParts} setCurrentPath={setCurrentPath} />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 3 }}>
          <ExplorerTreePanel tree={tree} currentPath={currentPath} setCurrentPath={setCurrentPath} />
        </Grid>

        <Grid size={{ xs: 12, md: 9 }}>
          <FilesPanel files={files} loading={loading} setCurrentPath={setCurrentPath} />
        </Grid>
      </Grid>
    </Box>
  );
}
