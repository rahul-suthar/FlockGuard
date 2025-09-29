FROM node:20-alpine

ENV NODE_ENV=production
WORKDIR /server

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production

EXPOSE 3000

CMD ["node", "src/index.js"]