import api from '../lib/axios';
import type { Attendance } from '../types';

interface GPSLocation {
  latitude: number;
  longitude: number;
}

export async function getAttendance(params?: {
  employeeId?: string;
  startDate?: string;
  endDate?: string;
}): Promise<Attendance[]> {
  const { data } = await api.get('/attendance', { params });
  return data;
}

export async function clockIn(gpsLocation?: GPSLocation): Promise<Attendance> {
  const { data } = await api.post('/attendance/clock-in', { gpsLocation });
  return data;
}

export async function startBreak(): Promise<Attendance> {
  const { data } = await api.post('/attendance/break/start');
  return data;
}

export async function endBreak(): Promise<Attendance> {
  const { data } = await api.post('/attendance/break/end');
  return data;
}

export async function clockOut(gpsLocation?: GPSLocation): Promise<Attendance> {
  const { data } = await api.post('/attendance/clock-out', { gpsLocation });
  return data;
}
