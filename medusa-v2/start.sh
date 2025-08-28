#!/bin/sh

echo "Running database migrations..."
pnpm medusa db:migrate

if [ $? -ne 0 ]; then
    echo "Database migration failed, exiting..."
    exit 1
fi

echo "Starting Medusa application..."
pnpm start
