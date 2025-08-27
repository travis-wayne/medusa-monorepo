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
# We use a placeholder for the first build, then update it with the real URL.
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
COPY --from=deps /app/node_modules ./node_modules
# The new official template outputs to a `dist` folder.
COPY --from=builder /app/dist ./dist
COPY package.json .

EXPOSE 9000
CMD ["node", "dist/index.js"]