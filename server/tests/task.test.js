import { describe, it, expect } from 'vitest';
import { computeTaskStats } from '../services/task.service.js';

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);

describe('computeTaskStats', () => {
  it('returns all-zero stats for an empty task list', () => {
    const stats = computeTaskStats([]);
    expect(stats).toMatchObject({ total: 0, completed: 0, active: 0, overdue: 0, completionPercentage: 0 });
  });

  it('counts completion percentage correctly', () => {
    const tasks = [
      { status: 'COMPLETED', dueDate: yesterday },
      { status: 'COMPLETED', dueDate: yesterday },
      { status: 'TODO', dueDate: tomorrow },
      { status: 'IN_PROGRESS', dueDate: tomorrow },
    ];
    const stats = computeTaskStats(tasks);
    expect(stats.total).toBe(4);
    expect(stats.completed).toBe(2);
    expect(stats.completionPercentage).toBe(50);
  });

  it('flags a non-completed task with a past due date as overdue', () => {
    const tasks = [
      { status: 'TODO', dueDate: yesterday },
      { status: 'IN_PROGRESS', dueDate: tomorrow },
    ];
    const stats = computeTaskStats(tasks);
    expect(stats.overdue).toBe(1);
  });

  it('never counts a COMPLETED task as overdue, even with a past due date', () => {
    const tasks = [{ status: 'COMPLETED', dueDate: yesterday }];
    expect(computeTaskStats(tasks).overdue).toBe(0);
  });

  it('labels workload "low" at or below the low threshold', () => {
    const tasks = Array.from({ length: 3 }, () => ({ status: 'TODO', dueDate: tomorrow }));
    expect(computeTaskStats(tasks).workloadLabel).toBe('low');
  });

  it('labels workload "high" at or above the high threshold', () => {
    const tasks = Array.from({ length: 8 }, () => ({ status: 'TODO', dueDate: tomorrow }));
    expect(computeTaskStats(tasks).workloadLabel).toBe('high');
  });

  it('labels workload "balanced" in between', () => {
    const tasks = Array.from({ length: 5 }, () => ({ status: 'TODO', dueDate: tomorrow }));
    expect(computeTaskStats(tasks).workloadLabel).toBe('balanced');
  });
});
