FROM node:16

ARG GPR_TOKEN

RUN mkdir /app
WORKDIR /app

COPY ./package.json ./package-lock.json ./tsconfig.json ./tsconfig.build.json ./nest-cli.json ./
COPY ./src ./src
COPY ./libs ./libs

RUN npm i --no-optional --ignore-scripts

EXPOSE 3000