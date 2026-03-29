import axios, { AxiosRequestConfig } from 'axios';
import { confirmDialog } from './helperFunctions';
import { BACKEND_URL } from 'env';

export const client = axios.create({
  baseURL: BACKEND_URL
});

const mergeHeaders = (
  defaultHeaders: Record<string, string>,
  customHeaders: Record<string, string> = {}
): Record<string, string> => {
  return { ...defaultHeaders, ...customHeaders };
};

const _request = async (url: string, { method, data, params, headers = {} }: AxiosRequestConfig) => {
  const defaultHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  const mergedHeaders = mergeHeaders(defaultHeaders, headers as Record<string, string>);

  try {
    const response = await client({
      url,
      method,
      data,
      params,
      headers: mergedHeaders,
      withCredentials: !url.includes('/public')
    });
    return response?.data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

const http = {
  get: async (url: string, params?: object) => _request(url, { method: 'GET', params }),
  post: async (url: string, data?: object | FormData) => {
    if (data instanceof FormData) {
      return _request(url, { method: 'POST', data, headers: { 'Content-Type': 'multipart/form-data' } });
    } else {
      return _request(url, { method: 'POST', data });
    }
  },
  put: async (url: string, data?: object | FormData) => {
    if (data instanceof FormData) {
      return _request(url, { method: 'PUT', data, headers: { 'Content-Type': 'multipart/form-data' } });
    } else {
      return _request(url, { method: 'PUT', data });
    }
  },
  patch: async (url: string, data?: object | FormData) => {
    if (data instanceof FormData) {
      return _request(url, { method: 'PATCH', data, headers: { 'Content-Type': 'multipart/form-data' } });
    } else {
      return _request(url, { method: 'PATCH', data });
    }
  },
  delete: async (url: string, data?: object, options?: { skipConfirm?: boolean }) => {
    if (!options?.skipConfirm) {
      const result = await confirmDialog({
        title: 'Are you sure?',
        text: 'Are you sure you want to delete this item? This action cannot be undone.',
        icon: 'warning',
        iconColor: '#DA0808',
        confirmButtonColor: '#DA0808',
        cancelButtonColor: 'transparent',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
      });

      if (!result.isConfirmed) return Promise.resolve(console.log('delete action was cancelled.'));
    }
    return _request(url, { method: 'DELETE', data });
  },
  archive: async (url: string, data?: object, options?: { skipConfirm?: boolean }) => {
    if (!options?.skipConfirm) {
      const result = await confirmDialog({
        title: 'Are you sure?',
        text: 'Are you sure you want to archive this item? This action cannot be undone.',
        icon: 'warning',
        iconColor: '#EE9518',
        confirmButtonColor: '#EE9518',
        cancelButtonColor: 'transparent',
        confirmButtonText: 'Archive',
        cancelButtonText: 'Cancel'
      });

      if (!result.isConfirmed) return Promise.resolve(console.log('archive action was cancelled.'));
    }
    return _request(url, { method: 'DELETE', data });
  },
  getFile: async (url: string, params?: object) =>
    _request(url, { method: 'GET', params, headers: { responseType: 'blob' } })
};

export default http;
