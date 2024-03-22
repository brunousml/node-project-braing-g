# Brain-g project

API for manage farm dataset using node, express, typescript, and solid principles. 

# Run Application using Docker
You need to have installed Docker before it. You will find instructions [here](https://docs.docker.com/engine/install/).
```shell
docker compose up
```

# API Docs
For api documentation you can access the following endpoint: http://localhost:3000/api-docs/ after when the server is running.

# Manual Installation

```shell
# Expose a postgres using docker 
docker compose up postgres

# Install project dependencies
yarn install
```

# Create database
```shell
yarn db:start
```

## Development mode
```shell
yarn start:dev
```

## Production mode
```shell
yarn build
yarn start
```