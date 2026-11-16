#!/usr/bin/env bash
# Preview this site locally with Jekyll.
#
#   ./scripts/serve.sh          -> http://127.0.0.1:4000
#   ./scripts/serve.sh 4001     -> http://127.0.0.1:4001
#
# Requires Ruby 3.4 + Jekyll 4 (installed via Homebrew; see README).
set -euo pipefail

PORT="${1:-4000}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

export PATH="/opt/homebrew/opt/ruby@3.4/bin:/opt/homebrew/lib/ruby/gems/3.4.0/bin:$PATH"

if ! command -v jekyll >/dev/null 2>&1; then
  echo "jekyll not found. Install it with:" >&2
  echo "  brew install ruby@3.4" >&2
  echo "  gem install jekyll bundler -- --with-cppflags=-I/opt/homebrew/include" >&2
  exit 1
fi

cd "$ROOT"
exec jekyll serve --host 127.0.0.1 --port "$PORT"
