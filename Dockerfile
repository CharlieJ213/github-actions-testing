# Stage 1: Build
FROM node:22 AS build

WORKDIR /app

COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

COPY . .
RUN npm run build

# Stage 2: Production
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]