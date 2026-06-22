#!/bin/sh

# Environment
set -a
source .env.local
set +a

# Open UI
open http://localhost:${LITELLM_PORT}/ui
