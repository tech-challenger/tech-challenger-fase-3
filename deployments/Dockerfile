# Use an official Node.js LTS (Long Term Support) image as the base
FROM node:lts-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm ci --only=production

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port on which your NestJS application will run
EXPOSE 8080

# Set the environment variables for the database connection
ENV MONGO_URL=mongodb://localhost:27017 \
    MONGO_DATABASE=tech_challenge \
    DOMAIN_REPOSITORY_ORDER_DATASTORE=mongo

# Install any additional system dependencies if required
# For example, if you need to install PostgreSQL client:
# RUN apk add --no-cache postgresql-client

# Build the application
RUN npm run build

# Start the NestJS application
CMD ["node", "dist/main"]