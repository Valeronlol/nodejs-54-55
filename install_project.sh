#!/bin/bash

cp .env.example .env && \
  npm install && \
  npm run docker:up && \
  sleep 5 && \
  npm run db:migrate && \
  npm run db:seed:up
