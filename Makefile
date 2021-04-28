include .env

.PHONY: up
up:
	docker-compose up -d

.PHONY: down
down:
	docker-compose down

.PHONY: logs
logs:
	docker-compose logs -f

.PHONY: migrate
migrate: 
	npx sequelize db:migrate

.PHONY: seed   
seed:
	npx sequelize db:seed:all

.PHONY: unseed
unseed: 
	npx sequelize db:seed:undo