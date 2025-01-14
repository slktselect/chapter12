'use client';

import type { FC } from 'react';

import { isFullscreen } from '@/libs/broswer';
import clsx from 'clsx';
import { useCallback, useMemo, useState } from 'react';

import type { EditorModalState, PageModalProps } from './types';

import { EditorModalContext } from './constants';
import { PageModal } from './page-modal';

export const EditorModal: FC<PageModalProps> = ({ className, children, ...rest }) => {
    const [fullscreen, setFullScreen] = useState<boolean>(false);
    const editorFullScreen = useCallback((value: boolean) => {
        setFullScreen(isFullscreen() || value);
    }, []);
    const fullscreenClassName = useMemo(
        () => (fullscreen ? '!tw-max-w-[100%] sm:!tw-max-w-[100%] tw-h-full' : ''),
        [fullscreen],
    );
    const value = useMemo<EditorModalState>(() => ({ editorFullScreen }), [editorFullScreen]);
    return (
        <PageModal {...rest} className={clsx(className, fullscreenClassName)}>
            <EditorModalContext value={value}>{children}</EditorModalContext>
        </PageModal>
    );
};
