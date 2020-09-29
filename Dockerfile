FROM node:lts

COPY package*.json ./
COPY *.js ./

RUN apt-get update
RUN apt-get install apt-transport-https
RUN wget -qO- https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add -
RUN wget -qO- https://storage.googleapis.com/download.dartlang.org/linux/debian/dart_stable.list > /etc/apt/sources.list.d/dart_stable.list
RUN apt-get update
RUN apt-get install dart
RUN export PATH="$PATH:/usr/lib/dart/bin"

EXPOSE 3000
EXPOSE 22000

RUN npm install

WORKDIR /node_modules/devextreme-themebuilder
RUN npm run dart-server

WORKDIR /

CMD [ "node", "start.js" ]
