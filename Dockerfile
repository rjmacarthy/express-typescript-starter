FROM node:8.11.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app
RUN npm run build

ENV NODE_ENV docker
ENV PORT 80
EXPOSE 80

CMD [ "npm", "run", "start" ]