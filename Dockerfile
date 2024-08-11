FROM node:18-alpine

WORKDIR /app

COPY ./frontend/package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]