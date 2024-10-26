# Docker in Deployment

This is a sample nodejs project to demostrate the capabilities for the utilizing the docker images in development. the project is open to collaborate for more docker files in `./docker-files` folder.

## Tutorial

Use the package manager [npm](https://www.npmjs.com/) to install the project and dependencies.

### Initialize a New Node.js Project

```bash
# Initialize a new Node.js project
npm init -y
```

### Install Dependencies

```bash
# Install express for the server
npm install express
```

### Create the Server File

In the root directory of your project, create an index.js file to serve as a basic Express server. This server will have a health check endpoint to verify it’s working.

```javascript
// index.js
const express = require("express");
const app = express();
const port = 3000;

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
```

### Run the code on local

In the root directory of your project, create an index.js file to serve as a basic Express server. This server will have a health check endpoint to verify it’s working.

```bash
node index.js
```

This runs the Node.js server on port 3000. You can test it by visiting `http://localhost:3000/health`.

### Create Dockerfiles for Development and Deployment

Let’s create two Dockerfiles: one for production (Dockerfile) and another for development (Dockerfile.dev).

#### Dockerfile for Deployment

This Dockerfile is optimized to install only production dependencies, keeping the image lightweight.

```bash
# Dockerfile
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install --only=production
COPY . .
EXPOSE 3000
CMD ["node", "index.js"]
```

#### Dockerfile for Development

The development Dockerfile includes all dependencies, including devDependencies, making it ideal for development.

```bash
# Dockerfile.dev
FROM node:20
WORKDIR /app
COPY package*.json ./
RUN npm install
RUN npm install -g nodemon
EXPOSE 3000
CMD ["nodemon", "-L", "index.js"]
```

#### `.dockerignore` file

```bash
node_modules
npm-debug.log
.git
```

## Usage

Build and run Docker Images

### Build and run docker image for production

```bash
docker build -t myapp:latest -f Dockerfile .
docker run -p 3000:3000 myapp:latest
```

### Build and run docker image for development

```bash
docker build -t myapp-dev:latest -f Dockerfile.dev .
docker run -p 3000:3000 -v $(pwd):/app -v /app/node_modules myapp-dev nodemon -L index.js
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
