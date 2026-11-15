#!/bin/bash
set -eo pipefail

# GitHub Pages Deployment Healthcheck Script
# Verifies that the deployed web application is live, accessible, and serving valid assets.

TARGET_URL="${1:-${BASE_URL:-https://kanggara.my.id}}"
TARGET_URL="${TARGET_URL%/}"

MAX_RETRIES="${MAX_RETRIES:-6}"
RETRY_INTERVAL="${RETRY_INTERVAL:-10}"
EXPECTED_ASSET="${EXPECTED_ASSET:-}"

# If EXPECTED_ASSET is not explicitly provided, attempt to detect it from local dist/index.html
if [ -z "$EXPECTED_ASSET" ] && [ -f "dist/index.html" ]; then
	EXPECTED_ASSET=$(grep -o 'src="/assets/[^"]*"' dist/index.html | head -n 1 | sed 's/src="//;s/"//' || true)
fi

echo "=================================================="
echo "  🚀 GitHub Pages Deployment Healthcheck"
echo "  Target URL       : $TARGET_URL"
if [ -n "$EXPECTED_ASSET" ]; then
	echo "  Expected Asset   : $EXPECTED_ASSET"
fi
echo "  Max Retries      : $MAX_RETRIES (Interval: ${RETRY_INTERVAL}s)"
echo "=================================================="

TMP_HTML=$(mktemp /tmp/gh_pages_home_XXXXXX.html)
trap 'rm -f "$TMP_HTML"' EXIT

# Step 1: Wait for site to become reachable and serve HTTP 200
SUCCESS=false
ATTEMPT=1

while [ $ATTEMPT -le $MAX_RETRIES ]; do
	echo "[Attempt $ATTEMPT/$MAX_RETRIES] Checking availability of $TARGET_URL ..."
	HTTP_CODE=$(curl -s -L -o "$TMP_HTML" -w "%{http_code}" "$TARGET_URL/" || echo "000")

	if [ "$HTTP_CODE" = "200" ]; then
		if grep -q 'id="root"' "$TMP_HTML"; then
			if [ -n "$EXPECTED_ASSET" ]; then
				if grep -Fq "$EXPECTED_ASSET" "$TMP_HTML"; then
					echo "  ✓ HTTP 200 OK & Expected asset verified ($EXPECTED_ASSET)"
					SUCCESS=true
					break
				else
					echo "  ⏳ Site is live (200), but CDN still serving older bundle (waiting for $EXPECTED_ASSET)..."
				fi
			else
				echo "  ✓ HTTP 200 OK & Application root container detected."
				SUCCESS=true
				break
			fi
		else
			echo "  ⚠️ HTTP 200 returned but root container not found in HTML."
		fi
	else
		echo "  ⚠️ Received HTTP status: $HTTP_CODE"
	fi

	if [ $ATTEMPT -lt $MAX_RETRIES ]; then
		echo "  Sleeping ${RETRY_INTERVAL}s before next attempt..."
		sleep "$RETRY_INTERVAL"
	fi
	ATTEMPT=$((ATTEMPT + 1))
done

if [ "$SUCCESS" != "true" ]; then
	echo "❌ Deployment verification failed: $TARGET_URL did not become ready after $MAX_RETRIES attempts."
	exit 1
fi

# Step 2: Validate live assets and critical endpoints
FAILURES=0

check_endpoint() {
	local PATH_NAME="$1"
	local DESCRIPTION="$2"
	local FULL_URL="$TARGET_URL$PATH_NAME"

	local CODE
	CODE=$(curl -s -L -o /dev/null -w "%{http_code}" "$FULL_URL" || echo "000")
	if [ "$CODE" = "200" ]; then
		echo "  ✓ [$CODE] $DESCRIPTION: $FULL_URL"
	else
		echo "  ✗ [$CODE] $DESCRIPTION: $FULL_URL"
		FAILURES=$((FAILURES + 1))
	fi
}

echo ""
echo "--- Verifying Live Bundles & Critical Endpoints ---"

# Extract main JS bundle
JS_SRC=$(grep -o 'src="/assets/[^"]*"' "$TMP_HTML" | head -n 1 | sed 's/src="//;s/"//' || true)
if [ -n "$JS_SRC" ]; then
	check_endpoint "$JS_SRC" "Main JS Bundle"
else
	echo "  ⚠️ Warning: Could not locate main JS bundle in HTML."
	FAILURES=$((FAILURES + 1))
fi

# Extract main CSS bundle
CSS_HREF=$(grep -o 'href="/assets/[^"]*\.css"' "$TMP_HTML" | head -n 1 | sed 's/href="//;s/"//' || true)
if [ -n "$CSS_HREF" ]; then
	check_endpoint "$CSS_HREF" "Main CSS Bundle"
else
	echo "  ⚠️ Warning: Could not locate main CSS bundle in HTML."
	FAILURES=$((FAILURES + 1))
fi

# Verify index.json
check_endpoint "/index.json" "Articles Index Data"

# Verify 404 SPA fallback
check_endpoint "/404.html" "SPA Fallback Handler"

# Verify default thumbnail asset
check_endpoint "/img/default.jpeg" "Default Thumbnail Asset"

echo ""
echo "=================================================="
if [ $FAILURES -eq 0 ]; then
	echo "🎉 All deployment healthchecks passed successfully!"
	echo "=================================================="
	exit 0
else
	echo "❌ Deployment healthchecks failed ($FAILURES issue(s) detected)."
	echo "=================================================="
	exit 1
fi
