#-----------------------------------------------------------
# Docker
#-----------------------------------------------------------

# Wake up docker containers
up:
	docker-compose -f docker-compose.prod.yml up -d

# Shut down docker containers
down:
	docker-compose down

# Show a status of each container
status:
	docker-compose ps

# Status alias
s: status

# Restart all containers
restart: down up

# Restart the node container
restart-node:
	docker-compose restart node

# Build and up docker containers
build:
	git pull
	docker-compose -f docker-compose.prod.yml up -d --build

# Build only node
build-node:
	docker-compose -f docker-compose.prod.yml build node

# Build only nest
build-nest:
	docker-compose -f docker-compose.prod.yml build nest

# Build and up docker containers
rebuild: down build

#-----------------------------------------------------------
# Terminals
#-----------------------------------------------------------

nest:
	docker-compose exec nest bash

node:
	docker-compose exec node bash

#-----------------------------------------------------------
# Redis
#-----------------------------------------------------------

redis:
	docker-compose exec redis redis-cli

redis-flush:
	docker-compose exec redis redis-cli FLUSHALL

#-----------------------------------------------------------
# Queue
#-----------------------------------------------------------



#-----------------------------------------------------------
# Logs
#-----------------------------------------------------------

# Show the frontend logs
logs-node:
	docker-compose logs --tail 1000 -f node

# Show the backend logs
logs-nest:
	docker-compose logs --tail 1000 -f nest

#-----------------------------------------------------------
# Database
#-----------------------------------------------------------

# Run database migrations
db-migrate:
	docker-compose exec nest npx sequelize-cli db:migrate

# Migrate alias
migrate: db-migrate

#-----------------------------------------------------------
# Clearing
#-----------------------------------------------------------

# Shut down and remove all volumes
remove-volumes:
	docker-compose down --volumes

# Remove all existing networks (useful if network already exists with the same attributes)
prune-networks:
	docker network prune

# Clear cache
prune-a:
	docker system prune -a

#-----------------------------------------------------------
# Parsing
#-----------------------------------------------------------

# Start parsing
start-parsing:
	docker-compose exec -d nest npm run parse update-stats 3 1
	docker-compose exec -d nest npm run parse update-stats 3 3
