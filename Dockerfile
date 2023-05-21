FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

RUN npm ci && npm run prepare-frontend && npm run prepare-server
# If you are building your code for production
# RUN npm ci --omit=dev

EXPOSE 8080
CMD [ "node", "./server/dist/app.js" ]
