# FIAP Tech-challenge - fase 1
> Note: under construction

## (Food Order Management API)

## Recomendations
* Node v18
* Editor VScode
* VScode Extensions:
  * ESLint, prettier
  * MongoDb for VS code
  * Docker
  * VScode nvm switcher > This project use .nvmrc file to automaticaly use required node version


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test
  or
$ make test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## Running the application and database with docker-compose

1. To run the application with a database, use the following command:

    ```
    $ make up
    ```
    or
   
    ```
    $ docker-compose -f "deployments/docker-compose.yml" up
    ```
> Note: By default the port number it runs on is **8080**.

## Running only database with docker-compose

1. To run the application with a database, use the following command:

    ```
    $ make up_db
    ```
    or
   
    ```
    $ docker-compose  -f "deployments/docker-compose.yml" up -d --build mongodb
    ```

1. To stop the application/databse, use the following command:

    ```
    $ make stop
    ```

## API Documentation
To see the API use documentation. Run the app and go to [Swagger](http://localhost:8080/api).


## Stay in touch

- Authors - [Wallace Benevides](https://github.com/wbenevides) and [Cassio Caue](https://github.com/CaueCassio)
- Documentantion - [buinding]()
