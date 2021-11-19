FROM node:14.18.1-alpine3.12 as builder
WORKDIR /site
COPY . /site
RUN yarn install
RUN yarn build

# => Run container
FROM nginx:1.20.2-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

# Static build
COPY --from=builder /site/build /usr/share/nginx/html/

# Default port exposure
EXPOSE 80
