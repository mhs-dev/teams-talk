FROM node:latest

WORKDIR /app

COPY package*.json .

RUN npm install
RUN npx prisma generate
RUN npx prisma db push

COPY . .

CMD [ "npm", "run", "dev" ]