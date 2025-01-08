'use server';

import type { Metadata, ResolvingMetadata } from 'next';
import type { FC } from 'react';

import { Tools } from '@/app/_components/home/tools';
import { MarkdownPreview } from '@/app/_components/markdown/preivew';
import { fetchApi } from '@/libs/api';
import { formatChineseTime } from '@/libs/time';
import { isNil } from 'lodash';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import $styles from './page.module.css';

export const generateMetadata = async (
    { params }: { params: Promise<{ item: string }> },
    parent: ResolvingMetadata,
): Promise<Metadata> => {
    const { item } = await params;
    const result = await fetchApi(async (c) => c.api.posts[':item'].$get({ param: { item } }));
    if (!result.ok) return {};
    const post = await result.json();

    return {
        title: `${post.title} - ${(await parent).title?.absolute}`,
        keywords: post.keywords,
        description: post.description,
    };
};
const PostItemPage: FC<{ params: Promise<{ item: string }> }> = async ({ params }) => {
    const { item } = await params;
    const result = await fetchApi(async (c) => c.api.posts[':item'].$get({ param: { item } }));
    if (!result.ok) {
        if (result.status !== 404) throw new Error((await result.json()).message);
        return notFound();
    }
    const post = await result.json();
    return (
        <div className="tw-page-container">
            <Tools back />
            <div className={$styles.item}>
                <div className={$styles.thumb}>
                    <Image
                        src={post.thumb}
                        alt={post.title}
                        fill
                        priority
                        sizes="100%"
                        unoptimized
                    />
                </div>

                <div className={$styles.content}>
                    <header className={$styles.title}>
                        <h1>{post.title}</h1>
                    </header>
                    <div className={$styles.meta}>
                        <div>
                            <span>
                                <Calendar />
                            </span>
                            <time className="tw-ellips">
                                {!isNil(post.updatedAt)
                                    ? formatChineseTime(new Date(post.updatedAt))
                                    : formatChineseTime(new Date(post.createdAt))}
                            </time>
                        </div>
                    </div>
                    <div className={$styles.body}>
                        <MarkdownPreview text={post.body} previewTheme="arknights" />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PostItemPage;
