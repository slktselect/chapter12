'use client';

import type { FC, PropsWithChildren } from 'react';

import { isNil } from 'lodash';
import { useRef, useState } from 'react';

export const MdxCodeCopy: FC<PropsWithChildren & Record<string, any>> = ({ children, ...rest }) => {
    const textInput = useRef<HTMLDivElement>(null);
    const [hovered, setHovered] = useState(false);
    const [copied, setCopied] = useState(false);

    const onEnter = () => {
        setHovered(true);
    };
    const onExit = () => {
        setHovered(false);
        setCopied(false);
    };
    const onCopy = () => {
        setCopied(true);
        !isNil(textInput.current?.textContent) &&
            navigator.clipboard.writeText(textInput.current.textContent);
        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };
    return (
        <div ref={textInput} onMouseEnter={onEnter} onMouseLeave={onExit} className="tw-relative">
            {hovered && (
                <button
                    aria-label="Copy code"
                    type="button"
                    className={`tw-absolute tw-right-2 tw-top-2 tw-h-8 tw-w-8 tw-rounded tw-border-2 tw-bg-gray-700 tw-p-1 dark:tw-bg-gray-800 ${
                        copied
                            ? 'tw-border-green-400 focus:tw-border-green-400 focus:tw-outline-none'
                            : 'tw-border-gray-300'
                    }`}
                    onClick={onCopy}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        fill="none"
                        className={copied ? 'tw-text-green-400' : 'tw-text-gray-300'}
                    >
                        {copied ? (
                            <>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                                />
                            </>
                        ) : (
                            <>
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                />
                            </>
                        )}
                    </svg>
                </button>
            )}
            <pre {...rest}>{children}</pre>
        </div>
    );
};
