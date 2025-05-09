# Stage 1: Build Nuxt
FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

ARG PUBLIC_CDN_URL
ARG API_BASE_URL

ENV PUBLIC_CDN_URL=$PUBLIC_CDN_URL
ENV API_BASE_URL=$API_BASE_URL

COPY . .
RUN pnpm run build

# Stage 2: Runtime for Nuxt SSR
FROM node:22-alpine AS frontend
WORKDIR /app

COPY --from=build /app/.output ./.output

ENV PORT=3000
ENV HOST=0.0.0.0

EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
