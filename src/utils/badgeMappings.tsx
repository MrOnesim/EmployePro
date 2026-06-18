import Badge from '../components/Badge';

type BadgeVariant = 'green' | 'red' | 'yellow' | 'blue';

export const EMPLOYEE_STATUS_MAP: Record<string, { variant: BadgeVariant; label: string }> = {
  active: { variant: 'green', label: 'Actif' },
  inactive: { variant: 'red', label: 'Inactif' },
  pending: { variant: 'yellow', label: 'En attente' },
};

export const LEAVE_STATUS_MAP: Record<string, { variant: BadgeVariant; label: string }> = {
  pending: { variant: 'yellow', label: 'En attente' },
  approved: { variant: 'green', label: 'Approuvé' },
  rejected: { variant: 'red', label: 'Refusé' },
};

export const ATTENDANCE_STATUS_MAP: Record<string, { variant: BadgeVariant; label: string }> = {
  present: { variant: 'green', label: 'Présent' },
  late: { variant: 'yellow', label: 'En retard' },
  absent: { variant: 'red', label: 'Absent' },
  'half-day': { variant: 'blue', label: 'Mi-journée' },
};

export const LEAVE_TYPE_LABELS: Record<string, string> = {
  annual: 'Congé annuel',
  sick: 'Congé maladie',
  maternity: 'Congé maternité',
  special: 'Permission spéciale',
};

export function statusBadge(status: string, map: Record<string, { variant: BadgeVariant; label: string }>) {
  const s = map[status] || { variant: 'blue' as BadgeVariant, label: status };
  return <Badge variant={s.variant}>{s.label}</Badge>;
}

export function getLeaveTypeLabel(type: string): string {
  return LEAVE_TYPE_LABELS[type] || type;
}
