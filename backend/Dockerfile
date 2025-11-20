FROM node:20-alpine

# Work inside the backend folder
WORKDIR /usr/src/app/backend

# 1) Install ALL deps (including dev, because we need ts-node, typescript, etc.)
COPY backend/package*.json ./
RUN npm ci

# 2) Copy backend source and shared code
COPY backend ./
COPY shared ../shared

ENV NODE_ENV=production
EXPOSE 8000

# 3) Run the TS entrypoint via existing npm script
CMD ["npm", "run", "start"]
