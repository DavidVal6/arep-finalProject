# Use an official Node.js runtime as a parent image
FROM node:18 as build

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the React app
RUN npm run build

# Use Nginx as a lightweight web server to serve the built React app
FROM nginx:1.25.3-alpine3.18

# Copy the built React app from the build image to the Nginx web root directory
COPY --from=build /usr/src/app/build /usr/share/nginx/html

# Expose the port on which Nginx will run
EXPOSE 80

# Define the command to run Nginx
CMD ["nginx", "-g", "daemon off;"]