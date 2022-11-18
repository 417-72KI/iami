FROM node:19

# https://github.com/webextension-toolbox/generator-web-extension
RUN npm install -g yo generator-web-extension

ENV NODE_OPTIONS=--openssl-legacy-provider

EXPOSE 35729

ENTRYPOINT ["npm", "run"]
CMD ["dev", "chrome"]
