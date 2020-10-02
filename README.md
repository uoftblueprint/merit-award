# merit-award
# Getting started

### Install the latest versions of Go, Node, Yarn, Postgres, Docker (if you want to replicate our production environment)

### Clone the Repo

[https://github.com/uoftblueprint/merit-award](https://github.com/uoftblueprint/merit-award)

- Setting up the DB

    ### Create a new Postgres database

    ```bash
    createdb meritaward
    ```

    ### Create a Postgres user

    ```sql
    CREATE USER username SUPERUSER WITH PASSWORD 'passwordstring';
    ```

    ### Make sure your Postgres instance is running on the default port (5432)

- Setting up the frontend

    Switch into the `client` directory

    ### Install node modules

    ```bash
    npm i or yarn add
    ```

    ### Run frontend tests

    ```bash
    npm test or yarn test
    ```

    ### Run frontend server for development

    ```bash
    npm start or yarn start
    ```

    ### Build the frontend (not necessary)

    ```bash
    npm build or yarn build
    ```

    The frontend server will run on port 3000

- Setting up the backend

    Switch into the `server` directory

    ### Run tests

    ```bash
    go test ./...
    ```

    ### Run the Go server

    ```bash
    go run main.go --production=false
    ```

    The server will run on port 8080

- Replicating the production environment

    Start the Docker app

    ### Build the docker container

    ```bash
    docker build -t merit-award --build-arg dbpass=meritawardiscool .
    ```

    ### Run the docker container

    ```bash
    docker run -p 8080:8080 -d merit-award
    ```

    Your entire app should be accessible on port 8080
