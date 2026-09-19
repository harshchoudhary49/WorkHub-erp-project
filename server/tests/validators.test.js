import { describe, it, expect } from 'vitest';
import { applyLeaveSchema } from '../utils/validators/leave.validators.js';
import { createEmployeeSchema } from '../utils/validators/employee.validators.js';
import { registerSchema } from '../utils/validators/auth.validators.js';

describe('applyLeaveSchema', () => {
  it('accepts a valid same-day leave request', () => {
    const result = applyLeaveSchema.safeParse({ type: 'casual', startDate: '2026-06-01', endDate: '2026-06-01' });
    expect(result.success).toBe(true);
  });

  it('rejects an end date before the start date', () => {
    const result = applyLeaveSchema.safeParse({ type: 'casual', startDate: '2026-06-05', endDate: '2026-06-01' });
    expect(result.success).toBe(false);
  });

  it('rejects an unknown leave type', () => {
    const result = applyLeaveSchema.safeParse({ type: 'vacation', startDate: '2026-06-01', endDate: '2026-06-01' });
    expect(result.success).toBe(false);
  });
});

describe('createEmployeeSchema', () => {
  const base = { name: 'Jane Doe', email: 'jane@example.com', password: 'a_long_enough_password' };

  it('accepts a minimal valid payload and defaults the role to employee', () => {
    const result = createEmployeeSchema.safeParse(base);
    expect(result.success).toBe(true);
    expect(result.data.role).toBe('employee');
  });

  it('rejects an invalid email', () => {
    const result = createEmployeeSchema.safeParse({ ...base, email: 'not-an-email' });
    expect(result.success).toBe(false);
  });

  it('rejects a password shorter than 8 characters', () => {
    const result = createEmployeeSchema.safeParse({ ...base, password: 'short' });
    expect(result.success).toBe(false);
  });
});

describe('registerSchema (public self-registration)', () => {
  it('accepts role in the payload shape but the controller ignores it - schema itself allows it', () => {
    // This documents the security decision made in auth.controller.js: the
    // schema permits a role field (so admin/HR-created accounts can reuse
    // it), but the *public* /auth/register route never reads req.body.role.
    const result = registerSchema.safeParse({
      name: 'Jane Doe',
      email: 'jane@example.com',
      password: 'a_long_enough_password',
      role: 'admin',
    });
    expect(result.success).toBe(true);
  });
});
