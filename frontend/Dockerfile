# Stage 1 : React App
FROM node:18-alpine as builder

WORKDIR /app

COPY . .

RUN npm run build

# Stage 2 : Nginx Server

FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html

COPY --from=builder /app/nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ENTRYPOINT ["nginx", "-g", "daemon off;"]
