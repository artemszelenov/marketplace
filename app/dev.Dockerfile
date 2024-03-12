FROM node:20-alpine
WORKDIR /app
COPY . .
RUN npm install -g pnpm
RUN pnpm install
EXPOSE 5173
CMD ORIGIN_BACKEND_INTERNAL=http://pocketbase:8090 ORIGIN_BACKEND=http://localhost:8090 \
    pnpm exec vite dev --host 0.0.0.0