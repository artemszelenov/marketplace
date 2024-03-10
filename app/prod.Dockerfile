FROM node:20-alpine AS builder
ENV ORIGIN_BACKEND_INTERNAL=$ORIGIN_BACKEND_INTERNAL
ENV ORIGIN_BACKEND=$ORIGIN_BACKEND
ENV TELEGRAM_BOT_TOKEN=$TELEGRAM_BOT_TOKEN
ENV TELEGRAM_ORDERS_CHAT_ID=$TELEGRAM_ORDERS_CHAT_ID
WORKDIR /app
COPY package.json .
COPY pnpm-lock.yaml .
RUN npm install -g pnpm
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm build
RUN pnpm prune --prod

FROM node:20-alpine
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
COPY pnpm-lock.yaml .
EXPOSE 5173
CMD ORIGIN=$ORIGIN_FRONTEND HOST=0.0.0.0 PORT=5173 node build