FROM node

ADD . /app

RUN cd /app; \
npm install --production

EXPOSE 8001

WORKDIR "/app"

CMD ["npm", "start"]
