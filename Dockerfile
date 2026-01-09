FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY apps/landing/package.json ./apps/landing/
COPY apps/shop/package.json ./apps/shop/
COPY packages/ui/package.json ./packages/ui/
COPY packages/supabase/package.json ./packages/supabase/
COPY packages/types/package.json ./packages/types/
COPY packages/tailwind-config/package.json ./packages/tailwind-config/

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Build all apps
RUN npm run build

ENV NODE_ENV=production

EXPOSE 3000 3001

# Start both apps
CMD ["sh", "-c", "npm run start --workspace=@omm/landing & npm run start --workspace=@omm/shop"]
