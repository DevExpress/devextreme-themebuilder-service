FROM node:14.5

# Copy files to working directory
COPY package*.json ./
COPY *.js ./

# Install packages
RUN npm install

# Open app port
EXPOSE 3000

# Run app
CMD [ "node", "start.js" ]