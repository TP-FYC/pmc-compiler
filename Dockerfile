#FROM node:14-alpine as builder
#
#ENV NODE_ENV build
#
#USER node
#WORKDIR /home/node
#
#COPY --chown=node:node . .
#RUN npm install
#
#
#RUN npm run build \
#    && npm prune --production

# ---

FROM node:14

COPY . .
USER root

RUN apt update -y
RUN apt install -y curl wget
RUN apt-get update && apt-get install -y apt-transport-https \
       ca-certificates curl gnupg2 \
       software-properties-common
RUN curl -fsSL https://download.docker.com/linux/debian/gpg | apt-key add -
RUN apt-key fingerprint 0EBFCD88
RUN add-apt-repository \
       "deb [arch=arm64] https://download.docker.com/linux/debian \
       $(lsb_release -cs) stable"
RUN apt update
RUN apt install -y docker
RUN apt install -y docker-compose

RUN service docker restart

RUN npm install

RUN npm run build


#COPY --from=builder --chown=node:root /home/node/package*.json ./
#COPY --from=builder --chown=node:root /home/node/node_modules/ ./node_modules/
#COPY --from=builder --chown=node:root /home/node/dist/ ./dist/

EXPOSE 3004

CMD ["node", "dist/src/main.js"]






#FROM node:14-alpine as builder
#
#ENV NODE_ENV build
#
#USER node
#WORKDIR /home/node
#
#COPY --chown=node:node . .
#RUN npm install
#
#
#RUN npm run build \
#    && npm prune --production
#
## ---
#
#FROM node:14-alpine
#
#USER node
#WORKDIR /home/node
#
#COPY --from=builder --chown=node:node /home/node/package*.json ./
#COPY --from=builder --chown=node:node /home/node/node_modules/ ./node_modules/
#COPY --from=builder --chown=node:node /home/node/dist/ ./dist/
#
#EXPOSE 3004
#
#CMD ["node", "dist/main.js"]
