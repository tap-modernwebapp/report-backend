FROM node

ADD ./package.json /app/package.json

RUN cd /app; \
npm install --production

ADD . /app

EXPOSE 8001

WORKDIR "/app"

CMD ["npm", "start"]
