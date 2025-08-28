# ---- Base Node.js Image ----
FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

# ---- Builder ----
# This stage builds the Medusa backend
FROM base AS builder
COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# ---- Production ----
# This is the final, small image that will run in production
FROM base as production
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# The official start command from the documentation
CMD ["node", "dist/main.js"]