up:
		docker-compose up -d

server $(lib):
		docker-compose exec server $(lib)

front $(lib):
		docker-compose exec front $(lib)

down:
		docker-compose down

dev:	start