FROM node:20 AS Production

ENV NODE_ENV=production

WORKDIR /usr/src/client

COPY  package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "sh", "-c", "npm run start" ]