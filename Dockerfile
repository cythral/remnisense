FROM node:12
WORKDIR /app
COPY Backend .
ENTRYPOINT npm start