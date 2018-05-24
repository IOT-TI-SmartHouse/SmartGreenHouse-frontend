FROM node:latest
COPY /frontend /app
WORKDIR /app
RUN npm install
RUN npm run-script build