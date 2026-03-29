import { BusinessProfileResponse } from 'apis/business/types';
import { Location } from '../business/setting/location/types';

export interface SendCodeRequest {
  email: string;
  accepted_terms?: boolean;
  accepted_privacy?: boolean;
}

export interface VerifyCodeRequest {
  code: string;
  email?: string;
}

export interface RequestCodeForCSRequest {
  agency_code: string;
  email: string;
  return_to: string;
}
export interface VerifyCodeResponse {
  id: number;
  name: string | null;
  email: string;
  token?: string;
  phone_number: string | null;
  role: 'agency_admin' | 'business_admin' | 'location_admin' | 'agency_admin_readonly';
  status: 'inactive' | 'active';
  businesses: BusinessProfileResponse[];
  locations: Location[];
  meta: {
    token: string;
    account_status?: 'enabled' | 'disabled' | 'paused_by_admin' | 'paused_payment';
  };
  sso: {
    token: string;
    expires_at: string;
  };
}

export interface GenerateSSOTokenResponse {
  token: string;
  expires_at: string;
  identity: {
    user_id: string | number;
    email: string;
    name: string;
    company_id: string;
    company_name: string;
  };
}
