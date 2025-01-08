'use client';

import type { ChangeEventHandler, MouseEventHandler } from 'react';

import { generateLowerString } from '@/libs/utils';
import { isNil, trim } from 'lodash';
import Link from 'next/link';
import { forwardRef, useCallback, useEffect, useImperativeHandle, useState } from 'react';

import type { PostActionFormProps, PostCreateFormRef } from './types';

import { Details } from '../collapsible/details';
import { MarkdownEditor } from '../markdown/editor';
import { Button } from '../shadcn/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '../shadcn/ui/form';
import { Input } from '../shadcn/ui/input';
import { Textarea } from '../shadcn/ui/textarea';
import { usePostActionForm, usePostEditorScreenHandler, usePostFormSubmitHandler } from './hooks';

export const PostActionForm = forwardRef<PostCreateFormRef, PostActionFormProps>((props, ref) => {
    const [body, setBody] = useState(props.type === 'create' ? '文章内容' : props.item.body);
    const [slug, setSlug] = useState(props.type === 'create' ? '' : props.item.slug || '');
    const changeSlug: ChangeEventHandler<HTMLInputElement> = useCallback(
        (e) => setSlug(e.target.value),
        [],
    );

    const form = usePostActionForm(
        props.type === 'create' ? { type: props.type } : { type: props.type, item: props.item },
    );

    const generateTitleSlug: MouseEventHandler<HTMLAnchorElement> = useCallback(
        (e) => {
            e.preventDefault();
            if (!form.formState.isSubmitting) {
                const title = trim(form.getValues('title'), '');
                if (title) setSlug(generateLowerString(title));
            }
        },
        [form.formState.isSubmitting],
    );

    const submitHandler = usePostFormSubmitHandler(
        props.type === 'create' ? { type: 'create' } : { type: 'update', id: props.item.id },
    );

    const editorScreenHandler = usePostEditorScreenHandler();

    useEffect(() => {
        if (props.type === 'create' && !isNil(props.setPedding))
            props.setPedding(form.formState.isSubmitting);
    }, [form.formState.isSubmitting]);

    useEffect(() => {
        form.setValue('body', body);
    }, [body]);

    useEffect(() => {
        form.setValue('slug', slug);
    }, [slug]);

    useImperativeHandle(
        ref,
        () =>
            props.type === 'create'
                ? {
                      create: form.handleSubmit(submitHandler),
                  }
                : {},
        [props.type],
    );

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="tw-space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>文章标题</FormLabel>
                            <FormControl>
                                <Input
                                    {...field}
                                    placeholder="请输入标题"
                                    disabled={form.formState.isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Details summary="可选字段" defaultOpen>
                    <FormField
                        control={form.control}
                        name="summary"
                        render={({ field }) => (
                            <FormItem className="tw-mt-2 tw-border-b tw-border-dashed tw-pb-1">
                                <FormLabel>摘要简述</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="请输入文章摘要"
                                        disabled={form.formState.isSubmitting}
                                    />
                                </FormControl>
                                <FormDescription>摘要会显示在文章列表页</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="tw-mt-2 tw-border-b tw-border-dashed tw-pb-1">
                        <FormField
                            control={form.control}
                            name="slug"
                            render={({ field }) => (
                                <FormItem className="">
                                    <FormLabel>唯一URL</FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            value={slug}
                                            onChange={changeSlug}
                                            placeholder="请输入唯一URL"
                                            disabled={form.formState.isSubmitting}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        如果留空,则文章访问地址是id
                                        <Link
                                            className="tw-ml-5 tw-mr-1"
                                            href="#"
                                            onClick={generateTitleSlug}
                                            aria-disabled={form.formState.isSubmitting}
                                        >
                                            [点此]
                                        </Link>
                                        自动生成slug(根据标题使用&apos;-&apos;连接字符拼接而成,中文字自动转换为拼音)
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <FormField
                        control={form.control}
                        name="keywords"
                        render={({ field }) => (
                            <FormItem className="tw-mt-2 tw-border-b tw-border-dashed tw-pb-1">
                                <FormLabel>关键字</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="请输入关键字,用逗号分割(关键字是可选的)"
                                        disabled={form.formState.isSubmitting}
                                    />
                                </FormControl>
                                <FormDescription>
                                    关键字不会显示,仅在SEO时发挥作用.每个关键字之间请用英文逗号(,)分割
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem className="tw-mt-2 tw-border-b tw-border-dashed tw-pb-1">
                                <FormLabel>文章描述</FormLabel>
                                <FormControl>
                                    <Textarea
                                        {...field}
                                        placeholder="请输入文章描述"
                                        disabled={form.formState.isSubmitting}
                                    />
                                </FormControl>
                                <FormDescription>
                                    文章描述不会显示,仅在SEO时发挥作用
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </Details>
                <FormField
                    control={form.control}
                    name="body"
                    render={({ field: _ }) => (
                        <FormItem>
                            <FormLabel>文章内容</FormLabel>
                            <FormControl>
                                <MarkdownEditor
                                    content={body}
                                    setContent={setBody}
                                    handlers={editorScreenHandler}
                                    previewTheme="arknights"
                                    disabled={form.formState.isSubmitting}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                {props.type === 'update' && (
                    <Button type="submit" disabled={form.formState.isSubmitting}>
                        {form.formState.isSubmitting ? '更新中...' : '保存'}
                    </Button>
                )}
            </form>
        </Form>
    );
});
