import { useMutation } from '@tanstack/react-query';
import {
  GenerateSSOTokenResponse,
  RequestCodeForCSRequest,
  SendCodeRequest,
  VerifyCodeRequest,
  VerifyCodeResponse
} from './types';
import { generateSSOToken, logout, requestVerificationCodeForCS, sendEmailForCode, sendVerificationCode } from './api';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { CacheKeys } from 'utils/cacheKeys';
import { useBusiness } from 'providers/context/BusinessProvider';
import * as urls from 'routes/config';
import http from 'utils/http';
import { AgentResponse } from 'apis/business/agent/types';
import { setCookie } from 'utils/helperFunctions';
import Cookies from 'js-cookie';
import { queryClient } from 'providers/AllProviders';

export function useSendEmailForCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('return_to');

  return useMutation({
    mutationFn: (payload: SendCodeRequest) => {
      setCookie(CacheKeys.userEmail, payload.email);
      return sendEmailForCode(payload);
    },
    onSuccess: (data: any) => {
      if (data !== undefined) {
        const queryParams = returnTo ? `?return_to=${encodeURIComponent(returnTo)}` : '';
        navigate(`${urls.auth.base}/${urls.auth.emailVerification}${queryParams}`, { state: location.state });
      }
    }
  });
}

export function useRequestCodeForCS() {
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('return_to');
  return useMutation({
    mutationFn: (payload: RequestCodeForCSRequest) => {
      return requestVerificationCodeForCS({ ...payload, return_to: returnTo! });
    },
    onSuccess: (data: { email: string; domain: string; return_to: string }) => {
      if (data !== undefined) {
        const queryParams = data?.return_to
          ? `?return_to=${encodeURIComponent(data?.return_to)}&email=${encodeURIComponent(data.email)}`
          : '';
        window.location.href = `${data?.domain}/auth/email-verification${queryParams}`;
      }
    }
  });
}

export function useSendVerificationCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const { setSelectedBusiness, setSelectedLocation } = useBusiness();
  const [searchParams] = useSearchParams();
  const returnTo = searchParams.get('return_to');

  return useMutation({
    mutationFn: (payload: VerifyCodeRequest) => sendVerificationCode({ ...payload }),
    onSuccess: async (data: VerifyCodeResponse) => {
      setCookie(CacheKeys.isAuthenticated, 'true');
      const userRole = data.role;
      const userStatus = ['agency_admin', 'agency_admin_readonly'].includes(userRole)
        ? 'enabled'
        : data?.businesses?.[0]?.account_status;
      if (data?.sso?.token) {
        setCookie(CacheKeys.ssoSupportToken, data?.sso?.token);
      }
      setCookie(CacheKeys.userStatus, userStatus);

      if (returnTo) {
        const redirectUrl = new URL('https://supportkickcall.featurebase.app/api/v1/auth/access/jwt');
        redirectUrl.searchParams.set('jwt', data?.sso?.token as string);
        redirectUrl.searchParams.set('return_to', returnTo as string);
        window.location.href = redirectUrl.toString();
        return;
      }

      if (location.state && typeof location.state === 'string' && location.state.includes('stream-dsp/v1/authorize')) {
        return (window.location.href = location.state);
      }

      if (userStatus === 'disabled' || data?.meta?.account_status === 'disabled') {
        navigate('/welcome');
        return;
      }

      if (data?.meta?.account_status === 'paused_payment') {
        navigate('/agency/billing');
        return;
      }

      if (['agency_admin', 'agency_admin_readonly'].includes(data.role)) {
        navigate(urls.agency.base);
        return;
      }
      const locationId = data?.locations?.[0]?.id;
      setSelectedBusiness(data?.businesses?.[0]?.id);
      setSelectedLocation(data?.locations?.[0].id);
      localStorage.setItem(CacheKeys.businessIds, JSON.stringify(data?.businesses?.map((item) => item.id)));
      localStorage.setItem(CacheKeys.locationIds, JSON.stringify(data?.locations?.map((item) => item.id)));
      const response = await http.get(`business/locations/${locationId}/agents`);
      if (response.data.length) {
        let ids = response.data?.map((item: AgentResponse) => item.id);
        localStorage.setItem(CacheKeys.agentIds, JSON.stringify(ids));
        navigate(`${urls.agentBase(data?.locations?.[0].id, response.data[0].id)}/${urls.home.performance}`);
      } else {
        navigate('/');
      }
    }
  });
}

export function useLogout() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => {
      return logout();
    },
    onSuccess: () => {
      const allCookies = Cookies.get();
      Object.keys(allCookies).forEach((cookieName) => {
        Cookies.remove(cookieName);
      });
      localStorage.clear();
      queryClient.removeQueries();
      navigate(`${urls.auth.base}/${urls.auth.login}`, { replace: true });
    }
  });
}

export function useGenerateSSOToken() {
  return useMutation({
    mutationFn: () => {
      return generateSSOToken();
    },
    onSuccess: (data: GenerateSSOTokenResponse) => {
      if (data?.token) {
        setCookie(CacheKeys.ssoSupportToken, data.token);
      }
      if (data?.identity) {
        localStorage.setItem('featurebase_identity', JSON.stringify(data.identity));
      }
    }
  });
}
