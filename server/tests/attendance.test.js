import { describe, it, expect } from 'vitest';
import { calculateAttendanceStats } from '../services/attendance.service.js';

describe('calculateAttendanceStats', () => {
  it('reports 0% with no additional-days-needed when nothing has elapsed', () => {
    const result = calculateAttendanceStats({ presentEquivalent: 0, workingDays: 0, targetPercentage: 75 });
    expect(result.percentage).toBe(0);
    expect(result.additionalDaysNeeded).toBe(0);
  });

  it('computes the current percentage correctly', () => {
    const result = calculateAttendanceStats({ presentEquivalent: 6, workingDays: 10, targetPercentage: 75 });
    expect(result.percentage).toBe(60);
  });

  it('says 0 more days needed once the target is already met', () => {
    const result = calculateAttendanceStats({ presentEquivalent: 8, workingDays: 10, targetPercentage: 75 });
    expect(result.percentage).toBe(80);
    expect(result.additionalDaysNeeded).toBe(0);
  });

  it('computes the minimum additional present days needed to reach target', () => {
    // 6/10 = 60%, target 75%. Solving (6+N)/(10+N) >= 0.75 by hand gives N = 6.
    const result = calculateAttendanceStats({ presentEquivalent: 6, workingDays: 10, targetPercentage: 75 });
    expect(result.additionalDaysNeeded).toBe(6);

    // Verify the answer actually clears the target, and one fewer day does not.
    const withAnswer = (6 + result.additionalDaysNeeded) / (10 + result.additionalDaysNeeded);
    const withOneLess = (6 + result.additionalDaysNeeded - 1) / (10 + result.additionalDaysNeeded - 1);
    expect(withAnswer).toBeGreaterThanOrEqual(0.75);
    expect(withOneLess).toBeLessThan(0.75);
  });

  it('returns null (mathematically unreachable) for a 100% target once any day is missed', () => {
    const result = calculateAttendanceStats({ presentEquivalent: 9, workingDays: 10, targetPercentage: 100 });
    expect(result.additionalDaysNeeded).toBeNull();
  });

  it('defaults to the configured target percentage when none is passed', () => {
    const result = calculateAttendanceStats({ presentEquivalent: 5, workingDays: 10 });
    expect(result.targetPercentage).toBeGreaterThan(0);
  });
});
