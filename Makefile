install:
	npm install

install-deps:
	npm ci

publish:
	npm publish --dry-run

lint:
	npm run lint

tests:
	npm test -- --coverage --coverageProvider=v8

test-coverage:
	npm test --coverage
