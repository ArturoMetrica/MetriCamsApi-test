# Imagen oficial de Node.js basada en Alpine
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install --production

COPY . .

EXPOSE 3000

CMD ["node", "src/index.js"]
