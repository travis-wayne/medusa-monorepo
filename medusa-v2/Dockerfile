# ---- The Final, Single-Stage Dockerfile ----
# This is not optimized for size, but it is optimized for SUCCESS.

# Use a specific Node.js version
FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

# Set the working directory
WORKDIR /app

# Copy all the project files
COPY . .

# Install ALL dependencies
RUN pnpm install --frozen-lockfile

# Provide the backend URL for the admin build
# NOTE: We need to hardcode your Koyeb URL here.
# After this backend is deployed, Koyeb will give you a NEW URL.
# You will have to come back and replace the URL below with that NEW URL and redeploy one last time.
ENV MEDUSA_ADMIN_BACKEND_URL=https://<YOUR_KOYEB_APP_NAME>.koyeb.app

# Build the project. We don't need dummy variables as everything is installed.
RUN pnpm build

# Set the final working directory to the built server
WORKDIR /app/.medusa/server

# Expose the port
EXPOSE 9000

# The command to start the server, from within the built directory
CMD ["medusa", "start"]