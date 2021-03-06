FROM node:latest
COPY / /app
WORKDIR /app
RUN npm install
RUN npm run-script build
# CMD ["npm", "run-script", "build"]
CMD cp -a /app/dist/. /var/www
# CMD ["cp", "-a", "/app/dist/.", "/var/www/"]