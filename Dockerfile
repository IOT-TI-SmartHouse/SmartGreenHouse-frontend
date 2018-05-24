FROM node:latest
COPY / /app
WORKDIR /app
RUN npm install
RUN npm run-script build