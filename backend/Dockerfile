# --- Stage 1: The "Builder" ---
# Use the full Node.js 20 image. This image includes all the
# build tools (like python, make, g++) needed to compile
# native dependencies like bcrypt.
FROM node:20 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files first
COPY package.json package-lock.json ./

# Use 'npm ci' (Clean Install) which is faster and more reliable
# for production builds as it strictly follows the package-lock.json.
# We only install production dependencies.
RUN npm ci --production

# --- Stage 2: The "Final Image" ---
# Start from a new, clean, and minimal Node.js 20 'alpine' image.
# This makes your final image tiny and more secure.
FROM node:20-alpine

# Set the working directory
WORKDIR /app

# Copy the pre-built node_modules from the 'builder' stage.
# This is the magic: we get the compiled bcrypt module without
# needing any build tools in our final image.
COPY --from=builder /app/node_modules ./node_modules

# Copy the rest of your application code (index.js, routes/, controllers/, etc.)
# This is why we need the .dockerignore file!
COPY . .

# Set the environment variable to production
ENV NODE_ENV=production

# Expose the port your app listens on.
# Your app uses 3002 as a fallback.
EXPOSE 3002

# Security Best Practice: Run the app as a non-root 'node' user
# that's built into the official Node images.
USER node

# The command to start your application
# We run 'node index.js' directly, not 'npm run dev' or 'nodemon'.
CMD ["node", "index.js"]