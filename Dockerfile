# stage 1

FROM node:alpine AS dand-build
WORKDIR /app
COPY . .
RUN npm ci && npm run build

# stage 2

FROM nginx:alpine
COPY --from=dand-build /app/dist/dand /usr/share/nginx/html
EXPOSE 80