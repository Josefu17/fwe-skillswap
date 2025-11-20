FROM node:20-alpine AS build

WORKDIR /usr/src/app

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci

COPY frontend ./frontend
COPY shared ./shared

WORKDIR /usr/src/app/frontend

# If you use VITE_API_URL, allow it as a build arg
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# ---- Runtime image ----
FROM node:20-alpine

WORKDIR /usr/src/app

RUN npm install -g serve

COPY --from=build /usr/src/app/frontend/dist ./dist

EXPOSE 4173

CMD ["serve", "-s", "dist", "-l", "4173"]
