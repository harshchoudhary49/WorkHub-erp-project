import { describe, it, expect } from 'vitest';
import {
  startOfDay,
  isWeekend,
  isSameDay,
  eachDay,
  filterWorkingDays,
  monthRange,
} from '../utils/dateUtils.js';

describe('startOfDay', () => {
  it('zeroes out the time portion in UTC', () => {
    const d = startOfDay(new Date('2026-03-15T18:42:07Z'));
    expect(d.toISOString()).toBe('2026-03-15T00:00:00.000Z');
  });
});

describe('isWeekend', () => {
  it('flags Saturday and Sunday as weekend by default', () => {
    expect(isWeekend('2026-03-14')).toBe(true); // Saturday
    expect(isWeekend('2026-03-15')).toBe(true); // Sunday
  });

  it('does not flag a weekday as weekend', () => {
    expect(isWeekend('2026-03-16')).toBe(false); // Monday
    expect(isWeekend('2026-03-18')).toBe(false); // Wednesday
  });
});

describe('isSameDay', () => {
  it('treats two different times on the same calendar day as equal', () => {
    expect(isSameDay('2026-03-16T02:00:00Z', '2026-03-16T23:00:00Z')).toBe(true);
  });

  it('treats adjacent days as different', () => {
    expect(isSameDay('2026-03-16T23:59:00Z', '2026-03-17T00:01:00Z')).toBe(false);
  });
});

describe('eachDay', () => {
  it('is inclusive of both endpoints', () => {
    const days = eachDay('2026-03-16', '2026-03-18');
    expect(days).toHaveLength(3);
    expect(days[0].toISOString()).toBe('2026-03-16T00:00:00.000Z');
    expect(days[2].toISOString()).toBe('2026-03-18T00:00:00.000Z');
  });

  it('returns a single day when start equals end', () => {
    expect(eachDay('2026-03-16', '2026-03-16')).toHaveLength(1);
  });
});

describe('filterWorkingDays', () => {
  it('excludes weekends from a plain Mon-Fri week', () => {
    // Mon 2026-03-16 .. Fri 2026-03-20
    const days = filterWorkingDays('2026-03-16', '2026-03-20');
    expect(days).toHaveLength(5);
  });

  it('excludes weekends from a range spanning a weekend', () => {
    // Fri 2026-03-20 .. Mon 2026-03-23 -> Fri + Mon = 2 working days
    const days = filterWorkingDays('2026-03-20', '2026-03-23');
    expect(days).toHaveLength(2);
  });

  it('also excludes dates present in the holiday set', () => {
    const wednesday = startOfDay('2026-03-18').getTime();
    const days = filterWorkingDays('2026-03-16', '2026-03-20', new Set([wednesday]));
    expect(days).toHaveLength(4); // 5 weekdays minus the one holiday
  });
});

describe('monthRange', () => {
  it('returns the first and last calendar day of the given month', () => {
    const { start, end } = monthRange(2, 2026); // February 2026 (not a leap year)
    expect(start.toISOString()).toBe('2026-02-01T00:00:00.000Z');
    expect(end.toISOString()).toBe('2026-02-28T00:00:00.000Z');
  });

  it('handles a leap-year February correctly', () => {
    const { end } = monthRange(2, 2028);
    expect(end.getUTCDate()).toBe(29);
  });

  it('handles December correctly (rolls into next year internally)', () => {
    const { start, end } = monthRange(12, 2026);
    expect(start.toISOString()).toBe('2026-12-01T00:00:00.000Z');
    expect(end.toISOString()).toBe('2026-12-31T00:00:00.000Z');
  });
});
