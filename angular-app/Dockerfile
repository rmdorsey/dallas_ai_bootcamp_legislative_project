# 1) Build stage
FROM node:18-alpine AS builder
WORKDIR /app

# install deps
COPY angular-app/package*.json ./
RUN npm ci

# copy & build (production config)
COPY angular-app/ ./
RUN npm run build -- --configuration=production

# 2) Serve stage
FROM nginx:stable-alpine

# 2a) clean out the default welcome page
RUN rm -rf /usr/share/nginx/html/*

# 2b) copy your compiled browser bundle
#    adjust path if your project name isn't "angular-app"
COPY --from=builder /app/dist/browser/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]