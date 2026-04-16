import Cookies from 'js-cookie';

export type ConfirmDialogOptions = {
  title?: string;
  text?: string;
  // Allow callers to pass UI-specific options without breaking typing.
  [key: string]: unknown;
};

export type ConfirmDialogResult = {
  isConfirmed: boolean;
};

export const confirmDialog = async (options: ConfirmDialogOptions): Promise<ConfirmDialogResult> => {
  const message = [options.title, options.text].filter(Boolean).join('\n\n') || 'Are you sure?';
  const isConfirmed = window.confirm(message);
  return { isConfirmed };
};

export const setCookie = (name: string, value: any) => {
  Cookies.set(name, value, { expires: 15 });
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};
