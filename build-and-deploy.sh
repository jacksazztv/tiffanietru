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

tar cvzf build.incoming.tgz backend/build frontend/.nuxt

echo "Deploying..."
scp build.incoming.tgz harassman@165.227.206.52:
ssh harassman@165.227.206.52 sh deploy.sh

echo "Done"
