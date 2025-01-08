import type { NextConfig } from 'next';

import createMDX from '@next/mdx';
const withMDX = createMDX({
    extension: /\.mdx?$/,
    options: {
        remarkPlugins: [],
        rehypePlugins: [['rehype-prism-plus', { showLineNumbers: true }] as any],
    },
});

const nextConfig: NextConfig = {
    // 启用react严格模式(可选)
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
};

export default withMDX(nextConfig);
