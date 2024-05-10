# Use a slim Node.js image as the base
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your application runs on (replace 3000 with your actual port)
EXPOSE 3000

# Start the application using the command you specify (replace 'npm start' with your actual command)
CMD [ "node", "app.js" ]
