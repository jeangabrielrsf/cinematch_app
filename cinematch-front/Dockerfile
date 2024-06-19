FROM node:lts-alpine3.19

WORKDIR /tmp/react

COPY . .

RUN npm install

RUN npm run build

RUN mkdir -p /var/www/html
RUN mv dist/* /var/www/html

WORKDIR /

RUN rm -rf /tmp/react