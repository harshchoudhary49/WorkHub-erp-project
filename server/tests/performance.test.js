import { describe, it, expect } from 'vitest';
import { weightedAverage } from '../services/performance.service.js';

describe('weightedAverage (contribution score)', () => {
  it('returns null when every factor is missing', () => {
    const result = weightedAverage([
      { value: null, weight: 25 },
      { value: undefined, weight: 20 },
    ]);
    expect(result).toBeNull();
  });

  it('computes a plain weighted average when every factor is present', () => {
    // Equal weights -> should equal the plain average.
    const result = weightedAverage([
      { value: 80, weight: 50 },
      { value: 60, weight: 50 },
    ]);
    expect(result).toBe(70);
  });

  it('renormalizes weights when some factors are missing, instead of treating them as 0', () => {
    const weights = { taskCompletionRate: 25, onTimeDeliveryRate: 20, qualityScore: 20, collaborationScore: 15, goalsAchievedRate: 10, reliabilityScore: 10 };
    const result = weightedAverage([
      { value: 80, weight: weights.taskCompletionRate },
      { value: 90, weight: weights.onTimeDeliveryRate },
      { value: 70, weight: weights.qualityScore },
      { value: 60, weight: weights.collaborationScore },
      { value: null, weight: weights.goalsAchievedRate }, // missing - no goals due this period
      { value: 95, weight: weights.reliabilityScore },
    ]);
    // Hand calculation: usable weights sum to 90 (100 - the missing 10);
    // weighted sum = 80*25 + 90*20 + 70*20 + 60*15 + 95*10 = 7050; 7050/90 = 78.33...
    expect(result).toBeCloseTo(78.3, 1);
  });

  it('a missing factor never silently counts as zero', () => {
    const withMissing = weightedAverage([
      { value: 100, weight: 50 },
      { value: null, weight: 50 },
    ]);
    const allPresent = weightedAverage([
      { value: 100, weight: 50 },
      { value: 100, weight: 50 },
    ]);
    // If the missing factor were treated as 0, withMissing would be 50, not 100.
    expect(withMissing).toBe(100);
    expect(allPresent).toBe(100);
  });
});
