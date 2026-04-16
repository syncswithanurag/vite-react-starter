import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Link } from '@mui/material';

interface PathBreadcrumbsProps {
  repoName: string;
  pathParts: string[];
  setCurrentPath: (path: string) => void;
}

export function PathBreadcrumbs({ repoName, pathParts, setCurrentPath }: PathBreadcrumbsProps) {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize='small' />} sx={{ mb: 2 }}>
      <Link underline='hover' sx={{ cursor: 'pointer' }} onClick={() => setCurrentPath('')}>
        {repoName}
      </Link>

      {pathParts.map((part, index) => {
        const path = pathParts.slice(0, index + 1).join('/');
        return (
          <Link key={path} underline='hover' sx={{ cursor: 'pointer' }} onClick={() => setCurrentPath(path)}>
            {part}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
}
