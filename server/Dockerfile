FROM node:latest as build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY  . .

RUN npm run build 

FROM node:latest as prod

WORKDIR /app

# Install only prod deps
COPY package*.json ./
RUN npm install

COPY --from=build /app/dist/ ./dist

EXPOSE 3001

CMD ["npm","start"]






