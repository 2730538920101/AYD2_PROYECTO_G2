FROM node:18-alpine AS base

# 1. Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat

WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* ./
RUN \
  if [ -f yarn.lock ]; then yarn --frozen-lockfile; \
  elif [ -f package-lock.json ]; then npm ci; \
  elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i; \
  else echo "Lockfile not found." && exit 1; \
  fi

# 2. Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .


# Set environment to production before building
ENV NODE_ENV=production

# Build the Next.js app
RUN npm run build

# 3. Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

# Set environment to production
ENV NODE_ENV=production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN apk add --no-cache bash

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/.env.production ./.env.production
COPY --from=builder /app/scripts/entrypoint.sh ./scripts/entrypoint.sh
# Change ownership of the /app/.next directory and entrypoint script to the "nextjs" user
USER root
RUN chown -R nextjs /app/.next && \
    chown nextjs ./scripts/entrypoint.sh

RUN chmod -R 755 /app/.next && \
    chmod +x ./scripts/entrypoint.sh
ENTRYPOINT [ "./scripts/entrypoint.sh" ]

USER nextjs

# Expose the Next.js port
EXPOSE 3000
ENV PORT=3000

# Run the Next.js app
CMD ["node", "server.js"]