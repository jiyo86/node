FROM node

WORKDIR /server/src/app

COPY package.json ./

RUN npm install

RUN npm install pm2 -g

RUN npm run build

COPY ./dist .

EXPOSE 8080

CMD ["pm2-runtime","app.js"]