import { format, parseISO } from 'date-fns';
import { fr } from 'date-fns/locale';

export function formatDate(date: Date | string, fmt: string = 'dd MMM yyyy'): string {
  const d = typeof date === 'string' ? parseISO(date) : date;
  return format(d, fmt, { locale: fr });
}

export function formatTime(date: Date | null | undefined): string {
  if (!date) return '--:--';
  return format(date, 'HH:mm');
}

export function formatCurrency(amount: number, currency: string = 'FCFA'): string {
  return `${amount.toLocaleString()} ${currency}`;
}

export function formatShortSalary(amount: number): string {
  if (amount >= 1000000) return `${(amount / 1000000).toFixed(1)}M`;
  if (amount >= 1000) return `${(amount / 1000).toFixed(0)}K`;
  return String(amount);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(1)}%`;
}
