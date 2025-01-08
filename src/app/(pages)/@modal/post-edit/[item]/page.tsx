import type { Metadata, ResolvingMetadata } from 'next';
import type { FC } from 'react';

import { AuthLoginForm } from '@/app/_components/auth/login-form';
import { ModalSkeleton } from '@/app/_components/loading/modal';
import { EditorModal } from '@/app/_components/modal/editor-modal';
import { cn } from '@/app/_components/shadcn/utils';
import { checkAccessToken } from '@/libs/token';
import { isNil } from 'lodash';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

import { PostEditForm } from './form';

export const generateMetadata = async (_: any, parent: ResolvingMetadata): Promise<Metadata> => {
    return {
        title: `编辑文章 - ${(await parent).title?.absolute}`,
        description: '文章编辑页面',
    };
};

const PostEditPage: FC<{ params: Promise<{ item: string }> }> = async ({ params }) => {
    const { item } = await params;
    if (isNil(item)) return notFound();
    const auth = await checkAccessToken();
    return (
        <EditorModal
            title={`${isNil(auth) ? '请先登录' : '编辑文章'}`}
            match={['/post-edit/*']}
            className={cn({ 'sm:tw-max-w-[30%] !tw-w-auto': isNil(auth) })}
        >
            {isNil(auth) ? (
                <AuthLoginForm />
            ) : (
                <Suspense fallback={<ModalSkeleton />}>
                    <PostEditForm id={item} />
                </Suspense>
            )}
        </EditorModal>
    );
};

export default PostEditPage;
