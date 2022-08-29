# Image
FROM node:12.4

# Set up work directory
WORKDIR /var/www

# Configure host
ENV HOST 0.0.0.0

# Copy existing application directory contents
COPY /frontend /var/www

# Install Nuxt
RUN npm install
RUN npm run build

# Start the app
CMD [ "npm", "start" ]
