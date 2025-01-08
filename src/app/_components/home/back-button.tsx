'use client';

import type { FC, MouseEventHandler } from 'react';

import clsx from 'clsx';
import { Undo2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

import { Button } from '../shadcn/ui/button';

export const BackButton: FC = () => {
    const router = useRouter();
    const [historyLength, setHistoryLength] = useState(0);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setHistoryLength(window.history.length);
        }
    }, []);
    const goBack: MouseEventHandler<HTMLButtonElement> = useCallback(
        (e) => {
            e.preventDefault();
            if (historyLength > 1) router.back();
        },
        [historyLength],
    );

    return (
        <Button
            variant="outline"
            className={clsx('tw-rounded-sm', {
                'tw-pointer-events-none tw-opacity-50': historyLength <= 1,
            })}
            disabled={historyLength <= 1}
            aria-disabled={historyLength <= 1}
            onClick={goBack}
        >
            <Undo2 />
            返回
        </Button>
    );
};
