.SILENT:

.PHONY: dev
dev: build
	docker run --rm \
	-p 35729:35729 \
	-v `pwd`/app:/work/app \
	-v `pwd`/dist:/work/dist \
	-v `pwd`/packages:/work/packages \
	-it iami-container

.PHONY: prod
prod: build
	docker run --rm \
	-p 35729:35729 \
	-v `pwd`/app:/work/app \
	-v `pwd`/dist:/work/dist \
	-v `pwd`/packages:/work/packages \
	-it iami-container \
	build chrome

.PHONY: build
build:
	docker build -t iami-container .

.PHONY: setup
setup: build
	docker run --rm -v `pwd`:/work -w /work --entrypoint yarn -it iami-container install

.PHONY: test
test: build
	docker run --rm \
	-p 35729:35729 \
	-v `pwd`/app:/work/app \
	-v `pwd`/dist:/work/dist \
	-v `pwd`/packages:/work/packages \
	-v `pwd`/package.json:/work/package.json \
	-v `pwd`/package-lock.json:/work/package-lock.json \
	-it iami-container \
	test

.PHONY: bash
bash: build
	docker run --rm \
	-p 35729:35729 \
	-v `pwd`/app:/work/app \
	-v `pwd`/dist:/work/dist \
	-v `pwd`/packages:/work/packages \
	-v `pwd`/package.json:/work/package.json \
	-v `pwd`/package-lock.json:/work/package-lock.json \
	--entrypoint /bin/bash \
	-it iami-container

.PHONY: sh
sh: bash
