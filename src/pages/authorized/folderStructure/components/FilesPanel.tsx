import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Box, List, ListItemButton, ListItemIcon, ListItemText, Paper, Typography } from '@mui/material';
import { FileListLoader } from '../loaders/FileListLoader';
import type { GithubContentItem } from '../apis/types';

interface FilesPanelProps {
  files: GithubContentItem[];
  loading: boolean;
  setCurrentPath: (path: string) => void;
}

export function FilesPanel({ files, loading, setCurrentPath }: FilesPanelProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        height: 600,
        overflow: 'auto',
        border: '1px solid #e0e0e0',
        borderRadius: 2
      }}>
      <Box px={2} py={1.5} borderBottom='1px solid #eee' sx={{ background: '#fafafa' }}>
        <Typography fontWeight={600}>Files</Typography>
      </Box>

      <List dense>
        {loading ? (
          <FileListLoader />
        ) : (
          files.map((item) => (
            <ListItemButton
              key={item.path}
              onClick={() => {
                if (item.type === 'dir') {
                  setCurrentPath(item.path);
                }
              }}
              sx={{
                mx: 1,
                my: 0.3,
                borderRadius: 1,
                '&:hover': {
                  backgroundColor: '#f1f3f5'
                }
              }}>
              <ListItemIcon sx={{ minWidth: 28 }}>
                {item.type === 'dir' ? (
                  <FolderIcon fontSize='small' color='primary' />
                ) : (
                  <InsertDriveFileIcon fontSize='small' />
                )}
              </ListItemIcon>

              <ListItemText primary={item.name} primaryTypographyProps={{ fontSize: 14 }} />
            </ListItemButton>
          ))
        )}
      </List>
    </Paper>
  );
}
