FROM node:20-alpine

# Work inside the backend folder
WORKDIR /usr/src/app/backend

# Install ALL deps (including dev, because we need ts-node, typescript, etc.)
COPY backend/package*.json ./
RUN npm ci

# Copy backend source and shared code
COPY backend ./
COPY shared ../shared

ENV NODE_ENV=production
EXPOSE 8000

# Ensure uploads directory exists
RUN mkdir -p uploads

# Run the TS entrypoint via existing npm script
CMD ["npm", "run", "start"]
