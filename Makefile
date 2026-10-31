.PHONY: install
install:
	pnpm install --frozen-lockfile

.PHONY: format
format:
	./scripts/format.sh

.PHONY: format-check
format-check:
	./scripts/format.sh --check

.PHONY: lint
lint:
	./scripts/lint.sh

.PHONY: typecheck
typecheck:
	pnpm run typecheck

.PHONY: test
test: typecheck
	pnpm test

# Packages src/lib into dist/ and runs publint over the result.
.PHONY: build
build:
	pnpm run build

# Builds a minimal consumer against the packed tarball and fails if the default theme is not in its output.
.PHONY: consumer-check
consumer-check: build
	./scripts/consumer-check.sh

.PHONY: release
release:
	./scripts/publish.sh
