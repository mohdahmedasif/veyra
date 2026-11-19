# How access works

There are no usernames, emails or passwords. Access has two layers:

1. **Pair the device** (once per browser). Enter the household `ADMIN_KEY` (compared in constant time) or a one-time pairing key made in Settings → Devices. The server stores only the SHA-256 hash of a random 32-byte token and gives the raw token to the browser as a cookie that lasts a year.
2. **Unlock a profile with a PIN.** On a paired device, **Who's dressing today?** lists the profiles, and anyone can add a new one. A correct PIN (bcrypt, salted) creates a 30-day session. Only its hash is stored, and it's **bound to the device**, so a copied session cookie doesn't work in another browser.

Protections:
- **Cookies** are `HttpOnly` and `SameSite=Strict`, plus `Secure` over HTTPS.
- **PIN lockout:** the first 5 wrong PINs are free. Each further miss locks the profile for 1, 5, 30, then 120 minutes.
- **Rate limits per IP:** pairing 20, unlocking 30, and admin-key checks 20 per 5 minutes. They're held in memory, so they reset on restart.
- **Forgot your PIN?** "Forgot PIN?" on the unlock screen takes the admin key and a new PIN, clears the lockout and signs that profile out everywhere.
- **Changing your own PIN** signs you out on your other devices.
- **Household settings** (profiles, devices and AI keys) need the admin key. They stay unlocked on that device for 15 minutes.
- All the numbers live in `src/lib/access-config.ts`.

This model suits a household or a small trusted group, where the short PIN is protected by the lockout, the rate limit and device pairing. For a public app, use real accounts.

Upgrading from an older version: the access tables changed, so reset the database with `npx prisma db push --force-reset && npm run db:seed`.

