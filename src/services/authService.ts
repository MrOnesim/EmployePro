import api, { setTokens, clearTokens } from '../lib/axios';
import type { Company, Employee } from '../types';

export interface LoginRequest {
  email: string;
  password: string;
  type: 'company' | 'employee';
}

export interface LoginResponse {
  user: Employee;
  company: Company;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterCompanyRequest {
  ownerFirstName: string;
  ownerLastName: string;
  email: string;
  phone: string;
  name: string;
  address?: string;
  website?: string;
  employeeCount?: number;
}

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/login', credentials);
  setTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function logout(): Promise<void> {
  try {
    await api.post('/auth/logout');
  } finally {
    clearTokens();
  }
}

export async function refreshToken(): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/refresh');
  setTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function registerCompany(req: RegisterCompanyRequest): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>('/auth/register', req);
  setTokens(data.accessToken, data.refreshToken);
  return data;
}

export async function getProfile(): Promise<{ user: Employee; company: Company }> {
  const { data } = await api.get('/auth/profile');
  return data;
}
