#!/bin/sh

# Environment
set -a
source .env.local
set +a

# Run LiteLLM
litellm --config config.yaml --host 0.0.0.0 --port "${LITELLM_PORT}"
