FROM node:19

# https://github.com/webextension-toolbox/generator-web-extension
RUN yarn global add yo generator-web-extension

ENV NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 35729

ENTRYPOINT ["yarn", "run"]
CMD ["dev", "chrome"]
