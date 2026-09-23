import { z } from 'zod';

export const registrationDecisionSchema = z.object({
  status: z.enum(['APPROVED', 'REJECTED', 'CHANGES_REQUESTED', 'UNDER_REVIEW']),
  adminNotes: z.string().trim().min(10, 'Admin notes must be at least 10 characters long.').max(2000).optional().or(z.literal('')),
});

export const registrationSearchSchema = z.object({
  status: z.enum(['PENDING_REVIEW', 'UNDER_REVIEW', 'APPROVED', 'REJECTED', 'CHANGES_REQUESTED']).optional(),
  email: z.string().trim().email().optional().or(z.literal('')),
  name: z.string().trim().max(200).optional(),
});
