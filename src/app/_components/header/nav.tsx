import type { FC } from 'react';

import { cn } from '@/app/_components/shadcn/utils';
import Link from 'next/link';

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from '../shadcn/ui/navigation-menu';
import $styles from './nav.module.css';

const items = [
    {
        title: '首页',
        href: '/',
    },
];
export const HeaderNav: FC<{ scrolled: boolean }> = ({ scrolled }) => (
    <div className={$styles.nav}>
        <NavigationMenu className={$styles.menus}>
            <NavigationMenuList>
                {items.map((item) => (
                    <NavigationMenuItem
                        key={item.href}
                        className={cn(
                            $styles['menu-item'],
                            scrolled
                                ? $styles['menu-item-scrolled']
                                : $styles['menu-item-unscrolled'],
                        )}
                    >
                        <Link href={item.href} legacyBehavior passHref>
                            <NavigationMenuLink className={cn(navigationMenuTriggerStyle())}>
                                {item.title}
                            </NavigationMenuLink>
                        </Link>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    </div>
);
