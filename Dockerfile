FROM node:slim

#set  working directory in the container
WORKDIR /express-docker

ENV NODE_ENV=development

# copy only package.json and package-lock.json to leverage Docker cache for dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . ./

# Expose the ports the app runs on (backend and frontend)
EXPOSE 80 5173

# Start the application (assuming index.js is the entry point)
CMD ["node", "dist/index.js"]
