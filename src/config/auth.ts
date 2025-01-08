import type { AuthConfig } from '@/server/auth/types';

export const authConfig: AuthConfig = {
    jwtSecret: process.env.AUTH_JWT_SECRET || 'your-secret-key',
    // 代表令牌有效期5天，详细见：https://github.com/vercel/ms
    tokenExpiry: '5d',
};
