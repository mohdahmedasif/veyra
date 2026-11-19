# Security Policy

## Supported versions

Veyra is developed on the `main` branch. Security fixes are made there on a best-effort basis. Older builds may not receive a fix.

## What is sensitive

Veyra keeps these on the machine that runs it:

- The `ADMIN_KEY`, which pairs browsers and resets PINs
- Profile PINs, stored only as salted bcrypt hashes
- Session and device tokens, stored only as SHA-256 hashes
- AI keys (Gemini, OpenAI), stored encrypted with AES-256-GCM
- Wardrobe photos and data in the database and upload folder

Treat each of these like a password.

## Reporting a vulnerability

Please **do not** open a public issue for a security problem.

Report it privately through this repository's **Security → Report a vulnerability** page (GitHub private vulnerability reporting). Include:

- A description of the issue and its impact
- Steps to reproduce, or a proof of concept
- The version or commit you tested

Don't include real keys, PINs or photos in the report. Use made-up data instead.
