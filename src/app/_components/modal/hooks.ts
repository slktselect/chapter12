import { isNil } from 'lodash';
import { useContext } from 'react';

import type { EditorModalState } from './types';

import { EditorModalContext } from './constants';

export const useEditorModalContext = (): EditorModalState => {
    const context = useContext(EditorModalContext);
    if (isNil(context)) return {};
    return context;
};
