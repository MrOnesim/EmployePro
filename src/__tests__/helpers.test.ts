import { describe, it, expect } from 'vitest';
import { calculateDays, getInitials } from '../utils/helpers';
import { calculateNetSalary, calculateBonus, calculateDeductions } from '../utils/salary';

describe('helpers', () => {
  it('calculateDays returns correct number of days', () => {
    const start = new Date('2024-12-20');
    const end = new Date('2024-12-22');
    expect(calculateDays(start, end)).toBe(3);
  });

  it('getInitials returns first letters', () => {
    expect(getInitials('Kofi', 'Mensah')).toBe('KM');
  });
});

describe('salary', () => {
  it('calculateBonus returns 10% of salary', () => {
    expect(calculateBonus(1000000)).toBe(100000);
  });

  it('calculateDeductions returns 15% of salary', () => {
    expect(calculateDeductions(1000000)).toBe(150000);
  });

  it('calculateNetSalary returns salary + bonus - deductions', () => {
    expect(calculateNetSalary(1000000)).toBe(950000);
  });
});
