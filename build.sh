#!/bin/sh
export NODE_ENV=production

set -e

echo "Building backend"
( cd ./backend
  npm run build
)

echo "Building frontend"
( cd ./frontend
  npm run build
)

echo "Done"
