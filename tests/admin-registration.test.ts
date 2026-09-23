import { describe, expect, it } from 'vitest';
import { registrationDecisionSchema } from '../lib/validation/admin';

describe('Admin registration decisions', () => {
  it('accepts a valid approval payload', () => {
    const result = registrationDecisionSchema.safeParse({
      status: 'APPROVED',
      adminNotes: 'All evidence verified and onboarding approved.',
    });

    expect(result.success).toBe(true);
  });

  it('rejects invalid review states', () => {
    const result = registrationDecisionSchema.safeParse({
      status: 'INVALID_STATE',
      adminNotes: 'bad',
    });

    expect(result.success).toBe(false);
  });
});
