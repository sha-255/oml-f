FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json ./
RUN npm install

COPY .. .

RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

COPY --from=builder /app/.output ./.output
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", ".output/server/index.mjs"]