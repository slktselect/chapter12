import type { FC } from 'react';

import { fetchApi } from '@/libs/api';
import { formatChineseTime } from '@/libs/time';
import clsx from 'clsx';
import { isNil } from 'lodash';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { Suspense } from 'react';

import type { IPaginateQueryProps } from '../_components/paginate/types';

import { Tools } from '../_components/home/tools';
import { PageSkeleton } from '../_components/loading/page';
import { PostActionButtons } from '../_components/post/list';
import { PostListPaginate } from '../_components/post/paginate';
import $styles from './page.module.css';

const HomePage: FC<{ searchParams: Promise<IPaginateQueryProps> }> = async ({ searchParams }) => {
    const { page: currentPage, limit = 8 } = await searchParams;
    // 当没有传入当前页或当前页小于1时，设置为第1页
    const page = isNil(currentPage) || Number(currentPage) < 1 ? 1 : Number(currentPage);
    const result = await fetchApi(async (c) =>
        c.api.posts.$get({
            query: { page: page.toString(), limit: limit.toString() },
        }),
    );
    if (!result.ok) throw new Error((await result.json()).message);
    const { items, meta } = await result.json();

    if (meta.totalPages && meta.totalPages > 0 && page > meta.totalPages) {
        return redirect('/');
    }

    return (
        <div className="tw-page-container">
            <Suspense fallback={<PageSkeleton />}>
                <Tools />
                <div className={$styles.list}>
                    {items.map((item) => (
                        <div
                            className={$styles.item}
                            // 传入css变量的封面图用于鼠标移动到此处后会出现不同颜色的光晕效果
                            style={{ '--bg-img': `url(${item.thumb})` } as any}
                            key={item.id}
                        >
                            <Link className={$styles.thumb} href={`/posts/${item.slug || item.id}`}>
                                <Image
                                    src={item.thumb}
                                    alt={item.title}
                                    fill
                                    priority
                                    sizes="100%"
                                    unoptimized
                                />
                            </Link>
                            <div className={$styles.content}>
                                <div className={clsx($styles.title, 'tw-hover')}>
                                    <Link href={`/posts/${item.slug || item.id}`}>
                                        <h2 className="tw-ellips tw-animate-decoration tw-animate-decoration-lg">
                                            {item.title}
                                        </h2>
                                    </Link>
                                </div>
                                <div className={$styles.summary}>
                                    {isNil(item.summary)
                                        ? item.body.substring(0, 99)
                                        : item.summary}
                                </div>
                                <div className={$styles.footer}>
                                    <div className={$styles.meta}>
                                        <span>
                                            <Calendar />
                                        </span>
                                        <time className="tw-ellips">
                                            {!isNil(item.updatedAt)
                                                ? formatChineseTime(new Date(item.updatedAt))
                                                : formatChineseTime(new Date(item.createdAt))}
                                        </time>
                                    </div>
                                    <PostActionButtons id={item.id} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                {meta.totalPages! > 1 && <PostListPaginate limit={8} page={page} />}
            </Suspense>
        </div>
    );
};

export default HomePage;
