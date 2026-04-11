# Contributing to Soroban Guard Web

Thanks for your interest in contributing. This document covers how to get set up and what to keep in mind when submitting changes.

## Prerequisites

- Node.js 18+
- npm 9+
- A running instance of [soroban-guard-core](https://github.com/Veritas-Vaults-Network/soroban-guard-core) (or mock API)

## Local Setup

```bash
git clone https://github.com/Veritas-Vaults-Network/soroban-guard-web
cd soroban-guard-web
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_URL
npm run dev
```

## Code Style

- TypeScript strict mode — no `any` unless absolutely necessary
- Tailwind for all styling — no inline styles, no CSS modules
- Components are in `components/`, pages in `app/`
- Keep components small and single-purpose
- All user-facing strings must be in English

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add severity filter to findings table
fix: handle empty response from core API
chore: update tailwind to 3.4
docs: add API contract section to README
```

## Pull Request Process

1. Fork the repo and create a branch from `main`
2. Make your changes with clear, atomic commits
3. Run `npm run lint` and fix any issues
4. Open a PR with a description of what changed and why
5. Link any related issues

## Reporting Issues

Use [GitHub Issues](https://github.com/Veritas-Vaults-Network/soroban-guard-web/issues). Include:
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS if it's a UI bug

## License

By contributing you agree your changes will be licensed under the MIT License.
