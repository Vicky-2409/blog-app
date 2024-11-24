# Step 1: Use the official Node.js image as a base
FROM node:16

# Step 2: Set the working directory in the container
WORKDIR /usr/src/app

# Step 3: Copy the package.json and package-lock.json for dependencies
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Expose the port the service runs on
EXPOSE 4003

# Step 7: Command to run the service
CMD ["npm", "start"]
