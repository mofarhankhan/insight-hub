FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@11.19.1 \
    && npm ci --omit=dev

COPY . .

EXPOSE 5000

CMD ["npm","start"]
