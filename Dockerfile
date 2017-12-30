FROM nginx:alpine

## Copy our default nginx config
COPY config/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY dist /usr/share/nginx/html

EXPOSE 4200:4200

CMD ["nginx", "-g", "daemon off;"]
