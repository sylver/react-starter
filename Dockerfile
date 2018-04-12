FROM node:alpine

WORKDIR /app

RUN apk update && \
  apk upgrade && \
  rm -rf /var/cache/apk/*

COPY package.json .
RUN yarn install --quiet

COPY . .

CMD yarn start
