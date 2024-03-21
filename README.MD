# Brain-g project

API for manage farm dataset using node, express, typescript, and solid principles. 

# Installation

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
