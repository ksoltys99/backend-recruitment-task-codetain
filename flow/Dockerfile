FROM node:12

WORKDIR /app
COPY package*.json ./

RUN npm install
RUN npm install -g tsc \
    && npm install -g concurrently \
    && npm install -g typescript \
COPY . .

ENV PORT=8000

EXPOSE 8000

CMD ["npm", "start"]