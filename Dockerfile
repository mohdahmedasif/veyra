# syntax=docker/dockerfile:1
FROM node:20-slim AS base
RUN apt-get update && apt-get install -y --no-install-recommends openssl && rm -rf /var/lib/apt/lists/*
WORKDIR /app

# Install dependencies (postinstall runs prisma generate)
FROM base AS deps
COPY package.json package-lock.json ./
COPY prisma ./prisma
RUN npm ci

# Build the app. This stage also serves as the "migrate" image in docker-compose.
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# Minimal production image
FROM base AS runner
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN groupadd -r veyra && useradd -r -g veyra veyra
COPY --from=builder /app/public ./public
COPY --from=builder --chown=veyra:veyra /app/.next/standalone ./
COPY --from=builder --chown=veyra:veyra /app/.next/static ./.next/static
RUN mkdir -p uploads && chown -R veyra:veyra uploads
USER veyra
EXPOSE 3000
CMD ["node", "server.js"]
