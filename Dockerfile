FROM node:14 AS builder
WORKDIR /app
COPY ./package.json ./
COPY ./wait-for-it.sh ./
RUN npm install
COPY . .
RUN npm run build

FROM node:14-alpine
WORKDIR /app
COPY --from=builder /app ./
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
