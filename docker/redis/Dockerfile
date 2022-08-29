FROM redis:6.2.6

# Prepare log files
RUN touch /var/log/redis.log
RUN chmod -R 777 /var/log/redis.log

COPY redis.conf /usr/local/etc/redis/redis.conf
