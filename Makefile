.SILENT:

.PHONY: dev
dev:
	docker run --rm -p 35729:35729 -v `pwd`:/work -w /work -it iami-container

.PHONY: prod
prod:
	docker run --rm -p 35729:35729 -v `pwd`:/work -w /work -it iami-container build chrome

.PHONY: build
build:
	docker build -t iami-container .

.PHONY: setup
setup: build
	docker run --rm -v `pwd`:/work -w /work --entrypoint npm -it iami-container install

.PHONY: bash
bash: build
	docker run --rm -v `pwd`:/work -w /work --entrypoint /bin/bash -it iami-container
