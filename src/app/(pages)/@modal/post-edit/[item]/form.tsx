'use server';

import type { PostItem } from '@/server/post/type';
import type { FC } from 'react';

import { PostActionForm } from '@/app/_components/post/action-form';
import { fetchApi } from '@/libs/api';
import { notFound } from 'next/navigation';

export const PostEditForm: FC<{ id: string }> = async ({ id }) => {
    const result = await fetchApi(async (c) => c.api.posts.byid[':id'].$get({ param: { id } }));
    if (!result.ok) return notFound();
    const post = (await result.json()) as any as PostItem;
    return <PostActionForm type="update" item={post} />;
};
