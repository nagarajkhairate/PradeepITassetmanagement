# Stage 1: Build React Application
FROM node:20.13.1-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy environment variables file
COPY .env .env

# Install dotenv-cli to use .env variables
RUN npm install -g dotenv-cli

# Copy the rest of the application code
COPY . .

# Build the application with .env variables
RUN dotenv -e .env -- npm run build


# Stage 2: Serve React Application with Nginx
FROM nginx:1.23-alpine

# Set working directory
WORKDIR /usr/share/nginx/html

# Remove default nginx website
RUN rm -rf ./*

# Copy built React app from the builder stage
COPY --from=builder /app/build /usr/share/nginx/html

# Remove default nginx configuration
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom Nginx configuration
COPY nginx/default.conf /etc/nginx/conf.d/

# Expose port 80
EXPOSE 80

# Start Nginx
ENTRYPOINT ["nginx", "-g", "daemon off;"]



# ================================================
# # Stage 1: Build React Application
# FROM node:20.13.1-alpine AS builder

# WORKDIR /app
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install
# COPY .env .env

# # Install dotenv-cli to use .env variables
# RUN npm install -g dotenv-cli

# # Copy the rest of your application code
# COPY . .

# # Build the application with .env variables
# RUN dotenv -e .env -- npm run build


# # Stage 2: Serve React Application with Nginx
# FROM nginx:1.23-alpine

# WORKDIR /usr/share/nginx/html

# # Remove default nginx website
# RUN rm -rf ./*

# # Copy built React app from the builder stage
# COPY --from=builder /app/build /usr/share/nginx/html

# # Remove default nginx configuration
# RUN rm /etc/nginx/conf.d/default.conf

# # Copy custom Nginx configuration
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# EXPOSE 80

# # Start Nginx
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
