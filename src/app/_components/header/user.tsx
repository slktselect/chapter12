'use client';

import type { FC, MouseEventHandler } from 'react';

import { Avatar, AvatarFallback, AvatarImage } from '@/app/_components/shadcn/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/app/_components/shadcn/ui/dropdown-menu';
import { cn } from '@/app/_components/shadcn/utils';
import { fetchApi } from '@/libs/api';
import { deleteCookie } from '@/libs/coolkies';
import { ACCESS_TOKEN_COOKIE_NAME } from '@/libs/token';
import { isNil } from 'lodash';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

import { useAuth, useSetAuth } from '../auth/hooks';
import { useToast } from '../shadcn/hooks/use-toast';
import { Button } from '../shadcn/ui/button';
import UserAvatar from './avatar.svg';
import $styles from './user.module.css';

export const HeaderUser: FC<{ scrolled: boolean }> = ({ scrolled }) => {
    const auth = useAuth();
    const setAuth = useSetAuth();
    const router = useRouter();
    const { toast } = useToast();
    const loginOut: MouseEventHandler<HTMLAnchorElement> = useCallback(
        async (e) => {
            e.preventDefault();
            try {
                const res = await fetchApi(async (c) => c.api.auth.logout.$post());
                if (res.ok) {
                    deleteCookie(ACCESS_TOKEN_COOKIE_NAME);
                    setAuth(null);
                    router.push('/auth/login');
                }
            } catch (error) {
                toast({
                    variant: 'destructive',
                    title: '服务器错误,请重试！',
                    description: (error as Error).message,
                });
            }
        },
        [toast],
    );
    return (
        <div className={cn($styles.user)}>
            {isNil(auth) ? (
                <div className="tw-flex tw-gap-4">
                    <Button
                        className={cn(
                            $styles.authBtn,
                            scrolled ? $styles.loginBtnScrolled : $styles.loginBtnUnscrolled,
                        )}
                        asChild
                    >
                        <Link href="/auth/login">登录</Link>
                    </Button>
                    <Button
                        variant="secondary"
                        className={cn($styles.authBtn, {
                            [$styles.registerBtnUnscrolled]: !scrolled,
                        })}
                        asChild
                    >
                        <Link href="/auth/login">注册</Link>
                    </Button>
                </div>
            ) : (
                <DropdownMenu modal={false}>
                    <DropdownMenuTrigger asChild>
                        <Avatar className={$styles.avatar}>
                            <AvatarImage src={UserAvatar.src} />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="center"
                        className="tw-w-56 tw-text-center tw-text-stone-500"
                    >
                        <DropdownMenuLabel className="tw-justify-center">
                            我的账户
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Link href="#" onClick={loginOut}>
                                退出登录
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </div>
    );
};
