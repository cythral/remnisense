FROM node:12
WORKDIR /app
COPY Backend .
RUN npm install
ENTRYPOINT npm start