FROM amd64/node:20.14-slim As base
WORKDIR /app

FROM base as pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@9.3
RUN corepack enable
COPY . .

FROM pnpm As build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build
RUN pnpm run cache

FROM pnpm AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist
COPY --from=build /app/temp /app/temp
COPY --from=pnpm /app/.env /app/.env
COPY --from=pnpm /app/package.json /app/package.json
CMD [ "node", "dist/main" ]