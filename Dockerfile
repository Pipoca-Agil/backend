FROM node:16.14

WORKDIR /

COPY package*.json ./

COPY ./prisma ./prisma

RUN npm install

RUN npx prisma generate

EXPOSE 3000

COPY . .

CMD ["npm","run", "prestart"]
