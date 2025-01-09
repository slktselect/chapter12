# syntax=docker/dockerfile:1

# 使用 Node.js 的官方 Alpine 镜像作为基础镜像
ARG NODE_VERSION=22.13.0
ARG PNPM_VERSION=9.15.3
FROM node:${NODE_VERSION}-alpine

# 设置环境变量为开发环境
ENV NODE_ENV=development

# 安装 pnpm
RUN --mount=type=cache,target=/root/.npm \
    npm install -g pnpm@${PNPM_VERSION}

# 设置工作目录
WORKDIR /usr/src/app

# 复制源代码到容器
COPY . .

# 安装依赖
RUN ["pnpm", "install"]

RUN chmod +x build.sh && ./build.sh

# 暴露端口
EXPOSE 3000

CMD chmod +x start.sh && ./start.sh
