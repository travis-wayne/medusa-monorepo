# ---- Base Node.js Image ----
FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

# ---- Dependencies ----
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod

# ---- Builder ----
FROM base AS builder
ARG DATABASE_URL=postgres://dummy:dummy@dummy:5432/dummy
ARG REDIS_URL=redis://dummy
ARG JWT_SECRET=dummy-jwt-secret
ARG COOKIE_SECRET=dummy-cookie-secret
ARG MEDUSA_ADMIN_BACKEND_URL=http://localhost:9000

ENV DATABASE_URL=$DATABASE_URL
ENV REDIS_URL=$REDIS_URL
ENV JWT_SECRET=$JWT_SECRET
ENV COOKIE_SECRET=$COOKIE_SECRET
ENV MEDUSA_ADMIN_BACKEND_URL=$MEDUSA_ADMIN_BACKEND_URL

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

# ---- Runner (Final Image) ----
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy the production dependencies.
COPY --from=deps /app/node_modules ./node_modules

# Copy the entire, self-contained build output.
COPY --from=builder /app/.medusa/server ./.medusa/server

# Copy the package.json so we can use the 'start' script.
COPY package.json .

EXPOSE 9000

# The correct way to start this server is using the package.json start script.
CMD ["pnpm", "start"]