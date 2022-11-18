FROM node:20

# https://github.com/webextension-toolbox/generator-web-extension
RUN yarn global add yo generator-web-extension

ENV NODE_OPTIONS=--openssl-legacy-provider

WORKDIR /work
ADD package.json /work/package.json
ADD package-lock.json /work/package-lock.json

RUN npm install

EXPOSE 35729

ENTRYPOINT ["yarn", "run"]
CMD ["dev", "chrome"]
