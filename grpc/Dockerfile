FROM node:20 AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .
RUN npm run build || true

FROM node:20

WORKDIR /app

COPY --from=builder /app /app
RUN npm install --omit=dev

CMD ["npm", "dev:server"]
