import api from '../lib/axios';
import type { Company } from '../types';

export async function getCompany(): Promise<Company> {
  const { data } = await api.get('/company');
  return data;
}

export async function updateCompany(updates: Partial<Company>): Promise<Company> {
  const { data } = await api.put('/company', updates);
  return data;
}

export async function deposit(amount: number): Promise<Company> {
  const { data } = await api.post('/company/deposit', { amount });
  return data;
}

export async function withdraw(amount: number): Promise<Company> {
  const { data } = await api.post('/company/withdraw', { amount });
  return data;
}
