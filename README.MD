# Brain-g project

API for manage farm dataset using node, express, typescript, and solid principles. 

# Manual Installation

```shell
# Expose a postgres using docker 
docker compose up

# Install project dependencies
yarn install
```

# Create database
```shell
yarn sequelize db:create
yarn sequelize db:migrate
yarn sequelize db:seed:all
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

# API Docs
For api documentation you can access the following endpoint: http://localhost:3000/api-docs/ after when the server is running.