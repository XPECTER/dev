FROM node:21-alpine AS builder
WORKDIR /app

COPY ["package.json", "yarn.lock", "./"]
RUN yarn install

COPY . .
RUN yarn build
RUN yarn install --production

FROM node:21-alpine as completed
WORKDIR /app
COPY --from=builder /app ./
ENTRYPOINT ["node", "dist/main"]
EXPOSE 3000/tcp