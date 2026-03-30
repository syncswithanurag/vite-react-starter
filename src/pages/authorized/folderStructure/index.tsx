import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Breadcrumbs,
  Link,
  Skeleton
} from '@mui/material';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { useEffect, useState } from 'react';

const OWNER = 'syncswithanurag';
const REPO = 'vite-react-starter';

/* ---------------- TREE NODE ---------------- */

function TreeNode({ node, currentPath, setCurrentPath }: any) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setCurrentPath(node.path || '');
    setOpen((prev: boolean) => !prev);
  };

  return (
    <>
      <ListItemButton
        onClick={handleClick}
        selected={currentPath === (node.path || '')}
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

        {node.children?.length > 0 && (open ? <ExpandLess fontSize='small' /> : <ExpandMore fontSize='small' />)}
      </ListItemButton>

      {node.children && (
        <Collapse in={open}>
          <List disablePadding>
            {node.children.map((child: any) => (
              <TreeNode key={child.path} node={child} currentPath={currentPath} setCurrentPath={setCurrentPath} />
            ))}
          </List>
        </Collapse>
      )}
    </>
  );
}

/* ---------------- MAIN ---------------- */

export default function FolderStructure() {
  const [currentPath, setCurrentPath] = useState('');
  const [files, setFiles] = useState<any[]>([]);
  const [tree, setTree] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* FETCH FILES */
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLoading(true);

    fetch(`https://api.github.com/repos/${OWNER}/${REPO}/contents/${currentPath}`)
      .then((res) => res.json())
      .then((data) => {
        setFiles(Array.isArray(data) ? data : []);
      })
      .finally(() => setLoading(false));
  }, [currentPath]);

  /* BUILD TREE */
  useEffect(() => {
    if (!files.length) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTree((prev: any[]) => {
      const updateTree = (nodes: any[]): any[] => {
        if (!currentPath) {
          return [
            {
              name: REPO,
              path: '',
              children: files.filter((f) => f.type === 'dir')
            }
          ];
        }

        return nodes.map((node) => {
          if (node.path === currentPath) {
            return {
              ...node,
              children: files.filter((f) => f.type === 'dir')
            };
          }

          if (node.children) {
            return {
              ...node,
              children: updateTree(node.children)
            };
          }

          return node;
        });
      };

      return updateTree(prev);
    });
  }, [currentPath, files]);

  const parts = currentPath.split('/').filter(Boolean);

  return (
    <Box
      px={3}
      py={2}
      sx={{
        width: '100%',
        maxWidth: '100%'
      }}>
      {/* HEADER */}
      <Typography variant='h4' fontWeight={700} mb={1}>
        Folder Structure
      </Typography>

      {/* BREADCRUMB */}
      <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} sx={{ mb: 2 }}>
        <Link underline='hover' sx={{ cursor: 'pointer' }} onClick={() => setCurrentPath('')}>
          {REPO}
        </Link>

        {parts.map((p, i) => {
          const path = parts.slice(0, i + 1).join('/');
          return (
            <Link key={i} underline='hover' sx={{ cursor: 'pointer' }} onClick={() => setCurrentPath(path)}>
              {p}
            </Link>
          );
        })}
      </Breadcrumbs>

      <Grid container spacing={2}>
        {/* LEFT TREE */}
        <Grid size={{ xs: 12, md: 3 }}>
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
                <TreeNode key={node.path} node={node} currentPath={currentPath} setCurrentPath={setCurrentPath} />
              ))}
            </List>
          </Paper>
        </Grid>

        {/* RIGHT PANEL */}
        <Grid size={{ xs: 12, md: 9 }}>
          <Paper
            elevation={0}
            sx={{
              height: 600,
              overflow: 'auto',
              border: '1px solid #e0e0e0',
              borderRadius: 2
            }}>
            {/* HEADER */}
            <Box px={2} py={1.5} borderBottom='1px solid #eee' sx={{ background: '#fafafa' }}>
              <Typography fontWeight={600}>Files</Typography>
            </Box>

            <List dense>
              {/* LOADING */}
              {loading
                ? Array.from({ length: 8 }).map((_, i) => (
                    <Box key={i} px={2} py={1}>
                      <Skeleton height={20} />
                    </Box>
                  ))
                : files.map((item) => (
                    <ListItemButton
                      key={item.path}
                      onClick={() => {
                        if (item.type === 'dir') setCurrentPath(item.path);
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
                  ))}
            </List>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
