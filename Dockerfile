FROM nginx:latest
MAINTAINER Rvo <robbin@vanooij.nl>

RUN rm /etc/nginx/conf.d/default.conf

# ADD ssl /etc/ssl
ADD sites/pwa.conf /etc/nginx/conf.d
ADD nginx.conf /etc/nginx/nginx.conf
ADD ssl/cert.crt /etc/ssl/cert.crt
ADD ssl/cert.key /etc/ssl/cert.key

# expose default nginx ports
EXPOSE 80
EXPOSE 443
