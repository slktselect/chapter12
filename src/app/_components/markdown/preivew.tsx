'use client';

import type { FC } from 'react';

import 'md-editor-rt/lib/preview.css';
import { MdPreview } from 'md-editor-rt';

import type { MarkdownPreviewProps } from './types';

export const MarkdownPreview: FC<MarkdownPreviewProps> = (props) => {
    const { editorId = 'markdown-preview-editor', previewTheme = 'default', text } = props;
    return <MdPreview id={editorId} value={text} previewTheme={previewTheme} />;
};
