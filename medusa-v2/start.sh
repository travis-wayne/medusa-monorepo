#!/bin/sh

echo "Running database migrations..."
pnpm medusa db:migrate

if [ $? -ne 0 ]; then
    echo "Database migration failed, exiting..."
    exit 1
fi

echo "Creating publishable API key..."
pnpm medusa exec ./src/scripts/seed-api-key.ts

echo "Starting Medusa application..."
pnpm start
