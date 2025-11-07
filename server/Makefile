# Backend Management Makefile

# Variables
APP_NAME=backend-server
DOCKER_IMAGE=$(APP_NAME)
DOCKER_TAG=latest

# Node.js commands
.PHONY: run
run:
	npm run dev

.PHONY: build
build:
	npm run build

.PHONY: start
start:
	npm start

.PHONY: test
test:
	npm test

.PHONY: lint
lint:
	npm run lint

.PHONY: prisma-generate
prisma-generate:
	npx prisma generate

.PHONY: prisma-migrate
prisma-migrate:
	npx prisma migrate dev

.PHONY: prisma-studio
prisma-studio:
	npx prisma studio

.PHONY: clean
clean:
	rm -rf dist node_modules/.cache

# Docker commands
.PHONY: docker-build
docker-build:
	docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .

.PHONY: docker-run
docker-run:
	docker run -p 3000:3000 --env-file .env $(DOCKER_IMAGE):$(DOCKER_TAG)

# Docker Compose commands
.PHONY: up
up:
	docker compose up -d

.PHONY: up-build
up-build:
	docker compose up -d --build

.PHONY: down
down:
	docker compose down

.PHONY: down-clean
down-clean:
	docker compose down --remove-orphans

.PHONY: logs
logs:
	docker compose logs -f

.PHONY: logs-server
logs-server:
	docker logs -f backend_server

.PHONY: restart
restart:
	docker compose restart

# Database commands
.PHONY: db-migrate
db-migrate:
	docker exec backend_server npx prisma migrate deploy

.PHONY: db-generate
db-generate:
	docker exec backend_server npx prisma generate

.PHONY: db-studio
db-studio:
	docker exec backend_server npx prisma studio

# Install dependencies
.PHONY: deps
deps:
	npm install

# Help
.PHONY: help
help:
	@echo "Available commands:"
	@echo "  run          - Run the application in development mode"
	@echo "  build        - Build the application"
	@echo "  start        - Start the production server"
	@echo "  test         - Run tests"
	@echo "  lint         - Run linting"
	@echo "  clean        - Clean build artifacts"
	@echo ""
	@echo "Prisma commands:"
	@echo "  prisma-generate - Generate Prisma client"
	@echo "  prisma-migrate  - Run Prisma migrations"
	@echo "  prisma-studio   - Open Prisma Studio"
	@echo ""
	@echo "Docker commands:"
	@echo "  docker-build   - Build Docker image"
	@echo "  docker-run     - Run Docker container"
	@echo "  up             - Start all services with docker-compose"
	@echo "  up-build       - Start all services and rebuild"
	@echo "  down           - Stop all services"
	@echo "  down-clean     - Stop all services and remove orphans"
	@echo "  logs           - View logs from all services"
	@echo "  logs-server    - View logs from server container only"
	@echo "  restart        - Restart all services"
	@echo ""
	@echo "Database commands (in container):"
	@echo "  db-migrate     - Run database migrations"
	@echo "  db-generate    - Generate Prisma client"
	@echo "  db-studio      - Open Prisma Studio in container"
	@echo ""
	@echo "Dependencies:"
	@echo "  deps           - Install npm dependencies"