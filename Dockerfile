# syntax=docker/dockerfile:experimental

FROM node:16-alpine as base

USER root

WORKDIR /src

COPY ./package.json ./yarn.lock ./

RUN \
  --mount=id=yarn-cache,type=cache,target=/cache/yarn \
  --mount=id=node_modules,type=cache,target=/src/node_modules \
  --mount=type=tmpfs,target=/src/build \
  yarn setup:dependencies

FROM base as dev

ENV YARN_CACHE_FOLDER=/cache/yarn
ENV NODE_ENV=development

EXPOSE 19000
Expose 19001
Expose 19002

FROM base as publish

ARG RELEASE_TARGET
ARG EXPO_TOKEN

ENV EXPO_TOKEN=${EXPO_TOKEN}
ENV NODE_ENV=staging

COPY . .

RUN yarn expo:publish --release-channel ${RELEASE_TARGET}
