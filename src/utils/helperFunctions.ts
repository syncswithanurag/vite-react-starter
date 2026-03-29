import Cookies from 'js-cookie';

export const setCookie = (name: string, value: any) => {
  Cookies.set(name, value, { expires: 15 });
};

export const getCookie = (name: string) => {
  return Cookies.get(name);
};

export const removeCookie = (name: string) => {
  Cookies.remove(name);
};
