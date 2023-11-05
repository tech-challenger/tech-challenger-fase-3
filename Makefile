all: build up

# Build the container
build:
	docker-compose -f "deployments/docker-compose.yml" build

# Build and run the container
up:
	docker-compose -f "deployments/docker-compose.yml" up

# run the mongodb container
up_db:
	docker-compose  -f "deployments/docker-compose.yml" up -d --build mongodb

# Down and remove container
stop: 
	docker-compose -f "deployments/docker-compose.yml" down

# Run all tests: 
test:
	npm test