FROM node:20-alpine

WORKDIR /text-analyzer-ui-webpack
COPY package*.json .
RUN npm install
COPY . .
CMD ["npm", "run", "prod"]