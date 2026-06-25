import api from '../lib/axios';
import type { Payslip } from '../types';

interface PayrollConfig {
  id: string;
  companyId: string;
  currency: string;
  taxRate: number;
  socialChargesRate: number;
  paymentDay: number;
  overtimeRate: number;
}

export async function getPayslips(params?: {
  employeeId?: string;
  month?: number;
  year?: number;
}): Promise<Payslip[]> {
  const { data } = await api.get('/payslips', { params });
  return data;
}

export async function generatePayslip(employeeId: string): Promise<Payslip> {
  const { data } = await api.post('/payslips/generate', { employeeId });
  return data;
}

export async function processPayment(employeeId: string, amount: number): Promise<void> {
  await api.post('/payments/process', { employeeId, amount });
}

export async function getPayrollConfig(): Promise<PayrollConfig> {
  const { data } = await api.get('/payroll/config');
  return data;
}

export async function updatePayrollConfig(config: Partial<PayrollConfig>): Promise<PayrollConfig> {
  const { data } = await api.put('/payroll/config', config);
  return data;
}
