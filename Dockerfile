FROM node:current-alpine AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /usr/app
COPY package*.json ./
RUN npm install

FROM node:current-alpine AS builder
WORKDIR /usr/app
COPY . .
COPY --from=deps /usr/app/node_modules ./node_modules
RUN npm run build

FROM node:current-alpine as production
WORKDIR /usr/app
ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nodejs -u 1001

COPY --from=builder --chown=nodejs:nodejs /usr/app/build ./
COPY --from=builder /usr/app/node_modules ./node_modules
COPY --from=builder /usr/app/package.json ./package.json
COPY ./ormconfig.json ./

RUN npm install --global pm2
USER nodejs

EXPOSE 5000
CMD [ "pm2-runtime", "start", "npm", "--", "start" ]

