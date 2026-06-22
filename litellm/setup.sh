#!/bin/sh

# Environment
set -a
source .env.local
set +a

# Run Postgres DB
docker compose up -d
docker compose ps
prisma generate \
  --schema "$(python -c 'import litellm, pathlib; print(pathlib.Path(litellm.__file__).parent / "proxy" / "schema.prisma")')"
