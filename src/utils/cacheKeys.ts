export type CacheKeysModel = {
  isAuthenticated: string;
  userEmail: string;
};

export const CacheKeys: CacheKeysModel = {
  isAuthenticated: 'persist:isAuthenticated',
  userEmail: 'user-email'
};
