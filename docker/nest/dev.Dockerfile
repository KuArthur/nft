# Image
FROM node:12.4

#RUN apt-get update && apt-get install -y cron

# Crontab
#RUN mkdir /etc/cron.d
#COPY cron.d/schedule /etc/cron.d
#RUN chmod -R 644 /etc/cron.d
#RUN crontab /etc/cron.d/schedule

# Set up work directory
WORKDIR /var/www

# Configure host
ENV HOST 0.0.0.0

# Init command
CMD ["sh", "-c", "npm install && npm run start:dev"]

