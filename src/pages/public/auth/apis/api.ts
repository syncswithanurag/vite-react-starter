import http from 'utils/http';
import {
  GenerateSSOTokenResponse,
  RequestCodeForCSRequest,
  SendCodeRequest,
  VerifyCodeRequest,
  VerifyCodeResponse
} from './types';
import {
  getLogoutUrl,
  getRequestVerificationCodeForCSUrl,
  getSendVerificationCodeUrl,
  generateSSOTokenUrl,
  getVerificationCodeUrl
} from './apiUrls';

export function sendEmailForCode(payload: SendCodeRequest): Promise<void> {
  return http.post(getSendVerificationCodeUrl(), payload);
}

export function requestVerificationCodeForCS(
  payload: RequestCodeForCSRequest
): Promise<{ email: string; domain: string; return_to: string }> {
  return http.post(getRequestVerificationCodeForCSUrl(), payload);
}

export function sendVerificationCode(payload: VerifyCodeRequest): Promise<VerifyCodeResponse> {
  return http.post(getVerificationCodeUrl(), payload);
}

export function logout(): Promise<void> {
  return http.delete(getLogoutUrl(), undefined, { skipConfirm: true });
}

export function generateSSOToken(): Promise<GenerateSSOTokenResponse> {
  return http.post(generateSSOTokenUrl(), {});
}
