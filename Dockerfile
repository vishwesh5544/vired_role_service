# Stage 1: Build the NestJS application
FROM node:18-alpine as build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install --silent

# Copy the rest of the application code
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Run the application
FROM node:18-alpine as prod

WORKDIR /app

# Copy the built application and node_modules from the build stage
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/package*.json ./

# Expose the port your application is running on
EXPOSE 3000

# Set the environment to production
ENV NODE_ENV=production

# Command to run the application
CMD ["node", "dist/main"]
