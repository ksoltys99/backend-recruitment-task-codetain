FROM node:12

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=6001

EXPOSE 6001

CMD ["npm", "start"]