# syntax=docker/dockerfile:1.6

FROM node:20-alpine AS base
WORKDIR /app

FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

FROM deps AS build
COPY . .
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
WORKDIR /app
COPY --from=deps /app/package.json ./package.json
COPY --from=deps /app/package-lock.json ./package-lock.json
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
COPY server ./server
COPY shared ./shared
COPY index.html ./index.html
COPY vite.config.js ./vite.config.js
COPY README.md ./README.md

EXPOSE 3000
CMD ["node", "server/index.js"]
