import type { PostItem } from '@/server/post/type';
import type { BaseSyntheticEvent } from 'react';

/**
 * 文章操作表单组件创建文章操作的参数
 */
export interface PostCreateFormProps {
    type: 'create';
    setPedding?: (value: boolean) => void;
}

/**
 * 文章操作表单组件更新文章操作的参数
 */
export interface PostUpdateFormProps {
    type: 'update';
    // 原来的文章数据，用于作为默认值数据与表单中编辑后的新数据合并，然后更新
    item: PostItem;
}

/**
 * 文章创建/编辑表单的参数类型
 */
export type PostActionFormProps = PostCreateFormProps | PostUpdateFormProps;

/**
 * 文章创建表单的Ref类型
 */
export interface PostCreateFormRef {
    create?: (e?: BaseSyntheticEvent) => Promise<void>;
}
