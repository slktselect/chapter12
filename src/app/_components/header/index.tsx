'use client';

import type { FC } from 'react';

import { cn } from '@/app/_components/shadcn/utils';
import { useScroll } from '@/libs/broswer';

import { HeaderLogo } from './logo';
import { HeaderNav } from './nav';
import $styles from './styles.module.css';
import { HeaderUser } from './user';

export const Header: FC = () => {
    const scrolled = useScroll(50);

    return (
        <header
            className={cn($styles.header, 'tw-page-container', {
                [$styles['header-scrolled']]: scrolled,
                [$styles['header-unscrolled']]: !scrolled,
            })}
        >
            <div
                className={cn($styles.container, {
                    'tw-mt-4': !scrolled,
                })}
            >
                <HeaderLogo scrolled={scrolled} />
                {/* Desktop Navigation */}
                <HeaderNav scrolled={scrolled} />
                {/* User Menu */}
                <HeaderUser scrolled={scrolled} />
            </div>
        </header>
    );
};
