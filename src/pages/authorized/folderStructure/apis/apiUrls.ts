export const getGithubRepoContentsUrl = (owner: string, repo: string, path = '') => {
  const baseUrl = `https://api.github.com/repos/${owner}/${repo}/contents`;
  return path ? `${baseUrl}/${path}` : baseUrl;
};
