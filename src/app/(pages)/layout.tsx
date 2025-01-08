import type { Metadata } from 'next';
import type { FC, PropsWithChildren, ReactNode } from 'react';

import { Auth } from '../_components/auth/provider';
import { Header } from '../_components/header';
import { Toaster } from '../_components/shadcn/ui/toaster';

export const metadata: Metadata = {
    title: 'pincman的博客',
    description:
        'pincman的个人博客,提供一些ts、react、node.js、php、golang相关的技术文档以及分享一些生活琐事',
};

const AppLayout: FC<PropsWithChildren<{ modal: ReactNode }>> = ({ children, modal }) => (
    <Auth>
        <div className="tw-app-layout">
            <Header />
            {children}
        </div>
        {modal}
        <Toaster />
    </Auth>
);
export default AppLayout;
