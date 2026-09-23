import { describe, expect, it } from 'vitest';
import { loginSchema, passwordSchema, registerSchema } from '../lib/validation/auth';

describe('Auth validation', () => {
  it('accepts a strong password', () => {
    const result = passwordSchema.safeParse('P@ssword123');
    expect(result.success).toBe(true);
  });

  it('rejects weak password', () => {
    const result = passwordSchema.safeParse('password');
    expect(result.success).toBe(false);
  });

  it('validates register payload', () => {
    const result = registerSchema.safeParse({
      firstName: 'Alice',
      lastName: 'Jones',
      email: 'alice@example.com',
      phone: '+447700900111',
      password: 'P@ssword123',
      confirmPassword: 'P@ssword123',
    });

    expect(result.success).toBe(true);
  });

  it('validates login payload', () => {
    const result = loginSchema.safeParse({
      email: 'user@example.com',
      password: 'P@ssword123',
    });

    expect(result.success).toBe(true);
  });
});
