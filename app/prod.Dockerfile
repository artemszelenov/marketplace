FROM node:20-alpine AS builder
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY . .
RUN ORIGIN_BACKEND_INTERNAL=http://pocketbase:8090 ORIGIN_BACKEND=https://api.652store.ru \
    pnpm exec vite build
RUN pnpm prune --prod

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
COPY pnpm-lock.yaml .
EXPOSE 5173
CMD ORIGIN=https://app.652store.ru HOST=0.0.0.0 PORT=5173 node build