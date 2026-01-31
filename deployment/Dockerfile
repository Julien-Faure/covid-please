FROM node:20-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV CI=true
RUN corepack enable

FROM base AS build
WORKDIR /src
COPY . .
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build

FROM base AS app
WORKDIR /app
COPY --from=build /src/dist /app
COPY deployment/app.js .
COPY deployment/entrypoint.sh .
COPY deployment/package.json .
RUN pnpm install
CMD [ "/bin/bash", "entrypoint.sh" ]
