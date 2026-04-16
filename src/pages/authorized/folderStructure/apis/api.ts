import http from '../../../../utils/http';
import { getGithubRepoContentsUrl } from './apiUrls';
import type { GithubContentItem } from './types';

export async function getGithubRepoContents(owner: string, repo: string, path: string): Promise<GithubContentItem[]> {
  const response = await http.get(getGithubRepoContentsUrl(owner, repo, path));
  return Array.isArray(response) ? response : [];
}
