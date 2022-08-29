# Image
FROM node:12.4

# Set up work directory
WORKDIR /var/www/frontend

# Configure host
ENV HOST 0.0.0.0

# Init command
CMD ["sh", "-c", "npm install && npm run dev"]
