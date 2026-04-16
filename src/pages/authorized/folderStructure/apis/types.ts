export interface GithubContentItem {
  name: string;
  path: string;
  type: 'file' | 'dir' | string;
}

export interface FolderTreeNode {
  name: string;
  path: string;
  children?: FolderTreeNode[];
}

export interface UseFolderStructureReturn {
  currentPath: string;
  files: GithubContentItem[];
  tree: FolderTreeNode[];
  pathParts: string[];
  loading: boolean;
  setCurrentPath: (path: string) => void;
}
