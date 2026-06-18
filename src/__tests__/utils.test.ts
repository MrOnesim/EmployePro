import { describe, it, expect } from 'vitest';
import { formatCurrency, formatTime } from '../utils/format';
import { exportToCSV, parseCSV } from '../utils/csv';

describe('formatCurrency', () => {
  it('formats with default currency (FCFA)', () => {
    expect(formatCurrency(5000)).toBe('5 000 FCFA');
  });

  it('formats with 0', () => {
    expect(formatCurrency(0)).toBe('0 FCFA');
  });

  it('formats with custom currency', () => {
    expect(formatCurrency(1500, 'EUR')).toBe('1 500 EUR');
  });

  it('formats large numbers', () => {
    expect(formatCurrency(1000000, 'USD')).toBe('1 000 000 USD');
  });

  it('formats decimal numbers', () => {
    expect(formatCurrency(1234.5)).toBe('1 234,5 FCFA');
  });
});

describe('formatTime', () => {
  it('returns --:-- for null', () => {
    expect(formatTime(null)).toBe('--:--');
  });

  it('returns --:-- for undefined', () => {
    expect(formatTime(undefined)).toBe('--:--');
  });

  it('formats a valid Date', () => {
    const date = new Date(2025, 0, 15, 8, 30);
    expect(formatTime(date)).toBe('08:30');
  });

  it('formats a Date with single-digit hour and minute', () => {
    const date = new Date(2025, 5, 1, 9, 5);
    expect(formatTime(date)).toBe('09:05');
  });

  it('formats midnight as 00:00', () => {
    const date = new Date(2025, 0, 1, 0, 0);
    expect(formatTime(date)).toBe('00:00');
  });
});

describe('exportToCSV', () => {
  it('does not throw with valid data', () => {
    const data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ];
    expect(() =>
      exportToCSV(data, ['Name', 'Age'], ['name', 'age'], 'test.csv'),
    ).not.toThrow();
  });

  it('does not throw with empty data', () => {
    expect(() =>
      exportToCSV([], ['Name', 'Age'], ['name', 'age'], 'empty.csv'),
    ).not.toThrow();
  });
});

describe('parseCSV', () => {
  it('parses a simple CSV string', () => {
    const csv = 'name,age\nAlice,30\nBob,25';
    const result = parseCSV(csv);
    expect(result).toEqual([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ]);
  });

  it('returns empty array for header-only CSV', () => {
    expect(parseCSV('name,age')).toEqual([]);
  });

  it('returns empty array for empty string', () => {
    expect(parseCSV('')).toEqual([]);
  });

  it('handles quoted values with commas', () => {
    const csv = 'name,city\n"Doe, John","Paris, France"\nSmith,"Lyon, France"';
    const result = parseCSV(csv);
    expect(result).toEqual([
      { name: 'Doe, John', city: 'Paris, France' },
      { name: 'Smith', city: 'Lyon, France' },
    ]);
  });

  it('trims whitespace from values', () => {
    const csv = 'name,age\n  Alice , 30 \n Bob , 25';
    const result = parseCSV(csv);
    expect(result).toEqual([
      { name: 'Alice', age: '30' },
      { name: 'Bob', age: '25' },
    ]);
  });

  it('handles trailing empty values', () => {
    const csv = 'a,b,c\n1,2,\n3,,5';
    const result = parseCSV(csv);
    expect(result).toEqual([
      { a: '1', b: '2', c: '' },
      { a: '3', b: '', c: '5' },
    ]);
  });

  it('handles mixed quoted and unquoted values', () => {
    const csv = 'col1,col2\n"hello",world\nfoo,"bar"';
    const result = parseCSV(csv);
    expect(result).toEqual([
      { col1: 'hello', col2: 'world' },
      { col1: 'foo', col2: 'bar' },
    ]);
  });
});
