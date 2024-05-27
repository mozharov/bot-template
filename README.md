## Updating Node.js version

Files that need to be updated for a new Node.js version:

- `.devcontainer/Dockerfile`
- `package.json`
- `.github/workflows/lint-and-build.yml`

## Database

All new entities and migrations should be added to the `src/database/index.ts`.
