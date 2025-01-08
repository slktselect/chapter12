import type { FC } from 'react';

import { Skeleton } from '../shadcn/ui/skeleton';

export const ModalSkeleton: FC = () => (
    <div className="tw-flex tw-w-full tw-flex-col tw-space-y-3">
        <Skeleton className="tw-h-32 tw-w-full" />
        <div className="tw-flex tw-h-16 tw-w-full tw-justify-between tw-space-x-20">
            <Skeleton className="tw-w-1/3 tw-flex-none tw-bg-gray-950/30 tw-backdrop-blur-sm" />
            <Skeleton className="tw-flex-auto  tw-bg-gray-950/30 tw-backdrop-blur-sm" />
        </div>
    </div>
);
