'use client';

import type { FC } from 'react';

import { useAuth } from '../auth/hooks';
import { PostCreateButton } from '../post/create-button';
import { BackButton } from './back-button';
import $styles from './tools.module.css';

export const Tools: FC<{ back?: boolean }> = ({ back }) => {
    const auth = useAuth();
    return (
        auth && (
            <div className={$styles.tools}>
                {back && <BackButton />}
                <PostCreateButton />
            </div>
        )
    );
};
