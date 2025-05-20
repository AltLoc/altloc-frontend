# Stage 1: Build Nuxt
FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

ARG PUBLIC_CDN_URL
ARG PUBLIC_API_BASE_URL
ARG PUBLIC_GOOGLE_ANALYTICS_ID

ENV PUBLIC_CDN_URL=$PUBLIC_CDN_URL
ENV PUBLIC_API_BASE_URL=$PUBLIC_API_BASE_URL
ENV PUBLIC_GOOGLE_ANALYTICS_ID=$PUBLIC_GOOGLE_ANALYTICS_ID

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
