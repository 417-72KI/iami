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

.PHONY: bash
bash: build
	docker run --rm \
	-p 35729:35729 \
	-v `pwd`/app:/work/app \
	-v `pwd`/dist:/work/dist \
	-v `pwd`/packages:/work/packages \
	--entrypoint /bin/bash \
	-it iami-container

.PHONY: sh
sh: bash
