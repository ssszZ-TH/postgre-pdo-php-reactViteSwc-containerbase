# Use an official Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json from the frontend folder
COPY ./frontend .

# Install dependencies
RUN npm install

# Expose port 5173 for the React Vite app
# EXPOSE 5173

# Start the React Vite development server
CMD [ "npm", "run", "dev" ]
