import { Collapse, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import type { FolderTreeNode } from '../apis/types';

interface TreeNodeProps {
  node: FolderTreeNode;
  currentPath: string;
  setCurrentPath: (path: string) => void;
}

export function TreeNode({ node, currentPath, setCurrentPath }: TreeNodeProps) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setCurrentPath(node.path);
    setOpen((previous) => !previous);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        selected={currentPath === node.path}
        sx={{
          pl: 2,
          borderRadius: 1,
          mx: 1,
          my: 0.3,
          '&.Mui-selected': {
            backgroundColor: '#e3f2fd'
          }
        }}>
        <ListItemIcon sx={{ minWidth: 28 }}>
          <FolderIcon fontSize='small' color='primary' />
        </ListItemIcon>
        <ListItemText primary={node.name} primaryTypographyProps={{ fontSize: 13 }} />
        {node.children && node.children.length > 0 ? (
          open ? (
            <ExpandLess fontSize='small' />
          ) : (
            <ExpandMore fontSize='small' />
          )
        ) : null}
      </ListItemButton>

      {node.children ? (
        <Collapse in={open}>
          <List disablePadding>
            {node.children.map((child) => (
              <TreeNode key={child.path} node={child} currentPath={currentPath} setCurrentPath={setCurrentPath} />
            ))}
          </List>
        </Collapse>
      ) : null}
    </>
  );
}
