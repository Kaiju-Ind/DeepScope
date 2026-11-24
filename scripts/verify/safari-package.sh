#!/usr/bin/env bash
# Wrap .output/safari-mv3 in a macOS app and build it ad-hoc signed.
# Usage: scripts/verify/safari-package.sh [out-dir]
# Loading the result in Safari still needs the owner: Safari > Settings >
# Advanced > "Show features for web developers", then Develop > "Allow
# Unsigned Extensions" (resets on every Safari launch), then enable
# "DeepScope Extension" in Settings > Extensions after opening the app once.
set -euo pipefail
root="$(cd "$(dirname "$0")/../.." && pwd)"
out="${1:-$(mktemp -d -t deepscope-safari)}"
[ -f "$root/.output/safari-mv3/manifest.json" ] || { echo "run: pnpm exec wxt build -b safari" >&2; exit 1; }
xcrun safari-web-extension-packager "$root/.output/safari-mv3" \
	--project-location "$out" --app-name DeepScope \
	--bundle-identifier dev.openarsenal.DeepScope \
	--macos-only --no-open --no-prompt --copy-resources --force
xcodebuild -project "$out/DeepScope/DeepScope.xcodeproj" -scheme DeepScope -configuration Debug \
	-derivedDataPath "$out/dd" CODE_SIGN_IDENTITY=- CODE_SIGNING_REQUIRED=NO DEVELOPMENT_TEAM= build -quiet
echo "$out/dd/Build/Products/Debug/DeepScope.app"
