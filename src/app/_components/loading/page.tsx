import type { FC } from 'react';

import { Skeleton } from '../shadcn/ui/skeleton';

const PageSkeleton: FC = () => (
    <div className="tw-w-full tw-justify-center tw-space-y-7">
        <div className="tw-flex tw-flex-col tw-space-y-3">
            <Skeleton className="tw-h-52 tw-w-full" />
            <div className="tw-flex tw-h-16 tw-w-full tw-justify-between tw-space-x-20">
                <Skeleton className="tw-w-1/3 tw-flex-none tw-bg-gray-950/30 tw-backdrop-blur-sm" />
                <Skeleton className="tw-flex-auto  tw-bg-gray-950/30 tw-backdrop-blur-sm" />
            </div>
        </div>
        <div className="tw-flex tw-flex-col tw-space-y-5">
            <Skeleton className="tw-h-52 tw-w-full tw-backdrop-blur-md" />
            <div className="tw-flex tw-h-16 tw-w-full tw-justify-between tw-space-x-20">
                <Skeleton className="tw-w-1/3 tw-flex-none tw-bg-gray-950/30 tw-backdrop-blur-sm" />
                <Skeleton className="tw-flex-auto tw-bg-gray-950/30 tw-backdrop-blur-sm" />
            </div>
        </div>
    </div>
);

export { PageSkeleton };
