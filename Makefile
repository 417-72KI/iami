
.PHONY: dev
dev:
	docker run -p 35729:35729 -v `pwd`:/work -w /work -t iami-container

.PHONY: build
build:
	docker build -t iami-container .
