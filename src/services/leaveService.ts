import api from '../lib/axios';
import type { Leave } from '../types';

export async function getLeaves(params?: {
  employeeId?: string;
  status?: string;
}): Promise<Leave[]> {
  const { data } = await api.get('/leaves', { params });
  return data;
}

export async function requestLeave(leave: Omit<Leave, 'id'>): Promise<Leave> {
  const { data } = await api.post('/leaves', leave);
  return data;
}

export async function approveLeave(id: string): Promise<Leave> {
  const { data } = await api.put(`/leaves/${id}/approve`);
  return data;
}

export async function rejectLeave(id: string): Promise<Leave> {
  const { data } = await api.put(`/leaves/${id}/reject`);
  return data;
}
