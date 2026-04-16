import { Box, List, Paper, Typography } from '@mui/material';
import { TreeNode } from './TreeNode';
import type { FolderTreeNode } from '../apis/types';

interface ExplorerTreePanelProps {
  tree: FolderTreeNode[];
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

export function ExplorerTreePanel({ tree, currentPath, setCurrentPath }: ExplorerTreePanelProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        height: 600,
        overflow: 'auto',
        border: '1px solid #e0e0e0',
        borderRadius: 2
      }}>
      <Box px={2} py={1} borderBottom='1px solid #eee'>
        <Typography fontWeight={600} fontSize={14}>
          Explorer
        </Typography>
      </Box>

      <List dense>
        {tree.map((node) => (
          <TreeNode
            key={node.path || node.name}
            node={node}
            currentPath={currentPath}
            setCurrentPath={setCurrentPath}
          />
        ))}
      </List>
    </Paper>
  );
}
