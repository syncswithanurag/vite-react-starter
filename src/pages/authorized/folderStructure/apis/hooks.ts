import { useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { getGithubRepoContents } from './api';
import type { FolderTreeNode, GithubContentItem, UseFolderStructureReturn } from './types';

const mapDirectoriesToTreeNodes = (items: GithubContentItem[]): FolderTreeNode[] => {
  return items.filter((item) => item.type === 'dir').map((item) => ({ name: item.name, path: item.path }));
};

const replaceChildrenAtPath = (
  nodes: FolderTreeNode[],
  targetPath: string,
  nextChildren: FolderTreeNode[]
): FolderTreeNode[] => {
  return nodes.map((node) => {
    if (node.path === targetPath) {
      return { ...node, children: nextChildren };
    }

    if (!node.children) {
      return node;
    }

    return {
      ...node,
      children: replaceChildrenAtPath(node.children, targetPath, nextChildren)
    };
  });
};

export function useGithubRepoContents(owner: string, repo: string, path: string) {
  return useQuery({
    queryKey: ['github-repo-contents', owner, repo, path],
    queryFn: () => getGithubRepoContents(owner, repo, path)
  });
}

export function useFolderStructure(owner: string, repo: string): UseFolderStructureReturn {
  const [currentPath, setCurrentPath] = useState('');
  const [tree, setTree] = useState<FolderTreeNode[]>([]);

  const { data: files = [], isLoading, isFetching } = useGithubRepoContents(owner, repo, currentPath);

  const directoryNodes = useMemo(() => mapDirectoriesToTreeNodes(files), [files]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setTree((previousTree) => {
      if (!currentPath) {
        return [{ name: repo, path: '', children: directoryNodes }];
      }

      return replaceChildrenAtPath(previousTree, currentPath, directoryNodes);
    });
  }, [currentPath, directoryNodes, repo]);

  const pathParts = useMemo(() => currentPath.split('/').filter(Boolean), [currentPath]);

  return {
    currentPath,
    files,
    tree,
    pathParts,
    loading: isLoading || isFetching,
    setCurrentPath
  };
}
