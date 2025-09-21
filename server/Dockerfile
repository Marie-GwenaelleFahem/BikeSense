# Use Node.js LTS Alpine image for smaller size
FROM node:18-alpine AS base

# Set working directory
WORKDIR /app

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create non-root user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S bikesense -u 1001

# Development stage
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Build stage
FROM base AS build
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM base AS production

# Copy dependencies
COPY --from=deps --chown=bikesense:nodejs /app/node_modules ./node_modules

# Copy built application
COPY --from=build --chown=bikesense:nodejs /app/dist ./dist
COPY --from=build --chown=bikesense:nodejs /app/package*.json ./
COPY --from=build --chown=bikesense:nodejs /app/swagger.yml ./

# Switch to non-root user
USER bikesense

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (res) => { process.exit(res.statusCode === 200 ? 0 : 1) })" || exit 1

# Use dumb-init for proper signal handling
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["node", "dist/server.js"]
