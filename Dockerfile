# Use official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock) into the working directory
COPY package*.json ./

# Copy tsconfig.json the working directory
COPY tsconfig.json ./

# Install dependencies
RUN npm install

# Copy the source code (including views) into the container
COPY ./src ./src

# Build the TypeScript code
RUN npm run build

# Expose the port the app will run on
EXPOSE 3000

# Start the app
CMD ["npm", "start"]

