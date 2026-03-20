FROM node:24-alpine

RUN apk add --no-cache curl

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm
RUN pnpm install --silent

EXPOSE 3000