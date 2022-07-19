FROM node:16-alpine

WORKDIR /nest

COPY package.json ./

COPY yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

CMD ["node", "dist/main"]