VERSION=1.0
APP_NAME=thecrown
IMAGE=$(DOCKER_USER)/$(APP_NAME)
TAG=$(VERSION)-$(CIRCLE_BUILD_NUM)

GULP=node_modules/.bin/gulp

login:
	@docker login -u "$(DOCKER_USER)" -p "$(DOCKER_PASS)"

clean: 
	$(NODE) $(GULP) clean

install: login
	$(NODE) npm install 

dist: install
	$(NODE) $(GULP) 

build_image:  dist
	docker build -t $(IMAGE) .

tag_image: build_image
	docker tag $(IMAGE)  $(IMAGE):$(TAG)
	docker tag $(IMAGE) $(IMAGE):latest

publish: tag_image
	docker push $(IMAGE):$(TAG)
	docker push $(IMAGE):latest
build: publish
.DEFAULT_GOAL :=publish
