FROM oven/bun:latest AS base

WORKDIR /app

ENV NODE_ENV="production"

FROM base AS build

RUN apt-get update -qq && apt-get install -y --no-install-recommends build-essential pkg-config python-is-python3

COPY --link ./bun.lock ./package.json ./
RUN bun install --ci

COPY --link ./client/bun.lock ./client/package.json ./client/
RUN cd client && bun install --ci

COPY --link . .

WORKDIR /app/client
RUN bun run build

RUN find . -mindepth 1 ! -regex '^./dist\(/.*\)?' -delete

FROM base

COPY --from=build /app /app

CMD ["bun", "start"]
