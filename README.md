# Project Setup Guide

## Cloning the Project

First, clone the project to your computer and navigate to the project directory.

## Installing Dependencies

This project requires several packages. We will use the following:
- `axios`: to fetch data
- `mysql2`: to interact with the database
- `express`: to create the API
- `cors`: to handle cross-origin requests
- `vue-router`: to navigate between pages

All required packages are specified in the `package.json` file. To install them, run the following command:

```sh
npm install
```

## Setting Database Environment Variables

Create a `.env` file in the base directory of the project with the following content:

```
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db_name
DB_PORT=your_port
```

## Populating the Database

Execute the `creation_database.sql` script to populate the database.

## Launching the Application

Open two terminals and navigate to the project directory:

- To launch the server, run: 
    ```sh
    node server.js
    ```

- To launch the client, run:
    ```sh
    npm run dev
    ```
