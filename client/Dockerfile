FROM node:alpine


WORKDIR /client

COPY package.json /client

RUN yarn install

COPY . /client

CMD ["yarn","run", "start"]