import { PAYROLL } from '../constants';

export function calculateBonus(salary: number): number {
  return salary * PAYROLL.BONUS_RATE;
}

export function calculateDeductions(salary: number): number {
  return salary * PAYROLL.DEDUCTION_RATE;
}

export function calculateNetSalary(salary: number): number {
  return salary + calculateBonus(salary) - calculateDeductions(salary);
}
