import type { StringValue } from '@/libs/ms';
import type { z } from 'zod';

import type { authItemSchema, authLoginRequestSchema, authLoginResponseSchema } from './schema';

export interface AuthConfig {
    jwtSecret: string;
    tokenExpiry: StringValue;
}
export type AuthLoginRequest = z.infer<typeof authLoginRequestSchema>;
export type AuthLoginResponse = z.infer<typeof authLoginResponseSchema>;
export type AuthItem = z.infer<typeof authItemSchema>;
