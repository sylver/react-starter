CONTAINER=app

.env: .env.sample
	cp .env.sample .env

all: docker/clean docker/build

docker/build:
	docker-compose build

docker/purge:
	docker rm -f `docker ps -a -q -f name=run` 2>/dev/null || true
	docker rm -f `docker ps -a -q -f exited=137` 2>/dev/null || true
	docker rm -f `docker ps -a -q -f exited=1` 2>/dev/null || true
	docker rmi `docker images -f "dangling=true" -q` 2>/dev/null || true
	docker volume prune -f

docker/destroy:
	docker-compose down

docker/clean: docker/destroy docker/purge

clean:
	sudo rm -rf dist
	sudo rm -rf coverage
	sudo rm -rf .tmp
	sudo rm -rf .nyc_output

test:
	docker-compose run --rm ${CONTAINER} yarn dev:test

coverage:
	docker-compose run --rm ${CONTAINER} yarn dev:coverage

dist:
	docker-compose run --rm ${CONTAINER} yarn build

.PHONY: docker/build docker/clean docker/destroy docker/purge \
	dist test coverage clean
