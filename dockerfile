FROM node:18-bullseye-slim as build

COPY . .

RUN npm install
RUN npm run build

FROM node:18-bullseye-slim as deps

COPY . .

RUN npm install --omit=dev

FROM node:18-bullseye-slim as app

WORKDIR /app

COPY --from=build .next .next
COPY --from=build package.json package.json
COPY --from=deps ./node_modules ./node_modules

EXPOSE 3000

CMD [ "npm", "run", "start" ]
