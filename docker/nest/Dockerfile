# Image
FROM node:12.4

# Set up work directory
WORKDIR /var/www

# Configure host
ENV HOST 0.0.0.0

# Copy existing application directory contents
COPY /nest /var/www

# Init command
CMD ["sh", "-c", "npm install && npm run start"]
