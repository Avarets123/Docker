FROM node:18.3-alpine3.15

WORKDIR /project/backend/src


COPY package*.json ./

RUN npm install

COPY . .

# RUN npm run db:migrate

RUN npm run build
