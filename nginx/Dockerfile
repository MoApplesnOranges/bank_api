FROM nginx:alpine

# Generate a self-signed SSL cert at build time so HTTPS works immediately.
# GitHub Pages (HTTPS) cannot call an HTTP API — mixed content is blocked.
# Users visiting https://<EC2-IP> once to accept the browser cert warning
# is enough; after that, GitHub Pages can call this API without issues.
RUN apk add --no-cache openssl && \
    mkdir -p /etc/nginx/ssl && \
    openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
      -keyout /etc/nginx/ssl/key.pem \
      -out  /etc/nginx/ssl/cert.pem \
      -subj "/C=US/ST=NY/L=NY/O=BankAPI/CN=bankapi"

COPY nginx.conf /etc/nginx/conf.d/default.conf
