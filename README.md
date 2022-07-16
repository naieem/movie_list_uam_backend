## Description

Backend api's for movie list application. This microservice uses mongodb as its database. You will find a folder named env and inside the env folder for development purpose please edit the 'dev.env' file for your local setup.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start:dev
```

## Support

The microservice will start 4000 by default.But you can change it from env file. You will get a swagger for this api service. The url will be "http://localhost:4000/api"
 After the initial running the app you need to sync movie into the db.
 ### Steps
 1. Create a new user from User endpoints.
 2. Login with that user from auth endpoints.
 3. As soon as you login the token will be stored in the cookie and also you can use it in header bearer token also.The validity of the token will be 15 mins.
 4. Now you can just run the sync endpoint for syncing all movies into database.

 Thus you can store demo movies into db. Now enjoy running frontend.

## Stay in touch
