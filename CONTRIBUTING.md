# Contributing to Veyra

Thanks for helping out. Veyra is an AI wardrobe assistant built with Next.js, TypeScript, Tailwind, Prisma and PostgreSQL, with optional Gemini and OpenAI styling.

Please read the [Code of Conduct](CODE_OF_CONDUCT.md) before you take part.

## Keep private data out

Never commit, upload or paste:

- `.env`, `ADMIN_KEY`, `ENCRYPTION_KEY`, Gemini or OpenAI keys, Cloudinary secrets, or PINs
- Real wardrobe data, including photos, exports and database dumps
- Deploy keys or server addresses

Use invented item names, placeholder keys and made-up photos in tests and fixtures.

## Development setup

You need Node.js 22 or later and PostgreSQL 14 or later.

```bash
git clone https://github.com/<owner>/veyra.git
cd veyra
cp .env.example .env     # set DATABASE_URL and ADMIN_KEY
npm install
npm run db:push
npm run db:seed          # optional demo profiles
npm run dev
```

The app runs on http://localhost:3000.

## Checks before you open a PR

```bash
npm run typecheck
npm run lint
npm run build
```

CI runs the same checks on every push to `main`.

## Pull requests

1. For a larger change, open an issue first to discuss the approach.
2. Keep each PR to one problem.
3. Follow the style of the surrounding code, and avoid reformatting files you aren't changing.
4. Describe what changed and why, and how you tested it. Add screenshots for UI changes, at phone and desktop widths.
5. Make sure the checks above pass.

## Commit messages

Write short, imperative subjects, such as `Add pairing key expiry`. Explain the why in the body when it isn't obvious.

## Reporting bugs and ideas

Open an issue with the bug report or feature request template. For security problems, follow [SECURITY.md](SECURITY.md) instead.
