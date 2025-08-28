# ---- Base Node.js Image ----
FROM node:20-alpine AS base
WORKDIR /app
RUN npm install -g pnpm

# ---- Dependencies ----
# Creates a lean node_modules with only production dependencies
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile --prod

# ---- Builder ----
# Builds the entire application, including dev dependencies
FROM base AS builder
ARG DATABASE_URL=postgres://dummy:dummy@dummy:5432/dummy
ARG REDIS_URL=redis://dummy
ARG JWT_SECRET=dummy-jwt-secret
ARG COOKIE_SECRET=dummy-cookie-secret
ARG MEDUSA_ADMIN_BACKEND_URL=https://motionless-cris-euphil-foods-66a09b91.koyeb.app
ARG DISABLE_ADMIN=true

ENV DATABASE_URL=$DATABASE_URL
ENV REDIS_URL=$REDIS_URL
ENV JWT_SECRET=$JWT_SECRET
ENV COOKIE_SECRET=$COOKIE_SECRET
ENV MEDUSA_ADMIN_BACKEND_URL=$MEDUSA_ADMIN_BACKEND_URL
ENV DISABLE_ADMIN=$DISABLE_ADMIN

COPY . .
RUN pnpm install --frozen-lockfile
RUN pnpm run build

# ---- Runner (Final Image) ----
# Assembles the final, lean production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV=production

# Copy the lean, production-only dependencies
COPY --from=deps /app/node_modules ./node_modules

# Copy the entire, self-contained build output from the correct folder
COPY --from=builder /app/.medusa ./.medusa

# Copy the package.json, tsconfig, and config file needed for the start command
COPY --from=builder /app/package.json .
COPY --from=builder /app/medusa-config.ts .
COPY --from=builder /app/tsconfig.json .
COPY --from=builder /app/start.sh .

# Make the start script executable
RUN chmod +x start.sh

EXPOSE 9000

# Use the startup script that handles migration and starting
CMD ["./start.sh"]
