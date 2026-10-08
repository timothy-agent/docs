NODE_IMAGE := node:24.18.0-alpine
DOCKER_RUN := docker run --rm -v "$(CURDIR)":/app -w /app

.PHONY: install dev build check preview

install:
	$(DOCKER_RUN) $(NODE_IMAGE) npm ci

dev:
	$(DOCKER_RUN) -it -p 4321:4321 $(NODE_IMAGE) npm run dev

build:
	$(DOCKER_RUN) $(NODE_IMAGE) npm run build

# The build runs the internal link check.
check: build

preview:
	$(DOCKER_RUN) -it -p 4321:4321 $(NODE_IMAGE) npm run preview
