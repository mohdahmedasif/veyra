/** Every tunable number for household access lives here. */
export const ACCESS = {
  pinMin: 4,
  pinMax: 8,
  freeAttempts: 5, // wrong PINs before lockouts start
  lockoutMinutes: [1, 5, 30, 120], // each further miss locks for the next step (last step repeats)
  deviceDays: 365,
  sessionDays: 30,
  adminMinutes: 15, // how long an admin-key unlock of Settings lasts
  pairingCodeMinutes: 10,
  rateLimits: {
    pair: { max: 20, windowMs: 5 * 60_000 },
    unlock: { max: 30, windowMs: 5 * 60_000 },
    admin: { max: 20, windowMs: 5 * 60_000 },
  },
} as const;

export const COOKIES = { device: "veyra_device", session: "veyra_session", admin: "veyra_admin" } as const;
