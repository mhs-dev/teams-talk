FROM node:latest

WORKDIR /app

COPY package*.json .

RUN npm install && npx prisma generate

COPY . .

CMD [ "npm", "run", "dev" ]