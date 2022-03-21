FROM node
WORKDIR /server
COPY package.json ./
COPY tsconfig.json ./
COPY src ./src
RUN ls -a
RUN npm install
RUN npm run build
## this is stage two , where the app actually runs
FROM node:
WORKDIR /server
COPY package.json ./
RUN npm install --only=production
COPY --from=0 /server/dist .
RUN npm install pm2 -g
EXPOSE 80
CMD ["pm2-runtime","app.js"]