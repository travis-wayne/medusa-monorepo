# ---- Base Node.js Image ----
# Using Node.js 20 on Alpine Linux for a small and secure base
FROM node:20-alpine AS base
WORKDIR /app
# Install pnpm globally
RUN npm install -g pnpm

# ---- Dependencies ----
# This stage installs ONLY production dependencies.
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod

# ---- Builder ----
# This stage builds the TypeScript code.
FROM base AS builder
# Provide DUMMY variables AND the crucial backend URL for the admin build.
ARG DATABASE_URL=postgres://dummy:dummy@dummy:5432/dummy
ARG REDIS_URL=redis://dummy
ARG JWT_SECRET=dummy-jwt-secret
ARG COOKIE_SECRET=dummy-cookie-secret
# We will pass the real backend URL during the Koyeb build.
ARG MEDUSA_ADMIN_BACKEND_URL

# Expose the ARGs as Environment Variables for the RUN command.
ENV DATABASE_URL=$DATABASE_URL
ENV REDIS_URL=$REDIS_URL
ENV JWT_SECRET=$JWT_SECRET
ENV COOKIE_SECRET=$COOKIE_SECRET
ENV MEDUSA_ADMIN_BACKEND_URL=$MEDUSA_ADMIN_BACKEND_URL

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm build

# ---- Runner (Final Image) ----
# This is the final, small image that will run in production.
from base as runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=deps /app/node_modules ./node_modules
# Medusa v2 outputs the build to `dist` in the new template.
COPY --from=builder /app/dist ./dist
COPY package.json .
COPY medusa-config.js .

EXPOSE 9000

# Run the compiled server file directly.
CMD ["node", "dist/index.js"]