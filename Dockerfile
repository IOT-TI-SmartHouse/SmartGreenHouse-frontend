FROM node:latest
COPY / /app
WORKDIR /app
RUN npm install
RUN npm run-script build
# CMD ["npm", "run-script", "build"]
RUN rm -r /var/www/*
CMD ["cp", "-a", "/app/dist/.", "/var/www/"]