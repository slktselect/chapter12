import type { FC } from 'react';

import { cn } from '@/app/_components/shadcn/utils';
import Link from 'next/link';

import $styles from './logo.module.css';

export const HeaderLogo: FC<{ scrolled: boolean }> = ({ scrolled }) => (
    <div
        className={cn(
            $styles.logo,
            scrolled ? $styles['logo-scrolled'] : $styles['logo-unscrolled'],
        )}
    >
        <Link href="/">3R教室</Link>
    </div>
);
