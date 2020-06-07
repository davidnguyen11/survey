# Survey API

Provide API for `admin` & `survey-web`.

- [Getting started](#getting-started)
  - [.env file](#env-file)
  - [Database](#database)
  - [Seeding data](#seeding-data)
- [Development](#development)
- [Production](#production)

## Getting started

- Make sure you have [Docker](https://www.docker.com/) installed on your machine.
- Make sure you have [NodeJS](https://nodejs.org/en/) installed on your machine.

Then run

**npm**

```bash
npm i
```

### .env file

**.env file**

Contains Database connection information.

1. Create the `.env` file
2. Copy and parse the database connection information below:

```bash
POSTGRES_USER=docker
POSTGRES_PASSWORD=docker
POSTGRES_HOST=localhost
POSTGRES_DB=survey
POSTGRES_PORT=54320
```

### Database

Using [postgresql](https://www.postgresql.org/) to setup manage database.

To set up database, run:

```bash
docker-compose up -d
```

### Initialize data

To initialize the dump data for a database, run:

```bash
npm run seed
```

## Development

To run on development environment

```bash
npm run dev
```

## Production

To run on production environment

```bash
npm run build
```

```bash
npm start
```

## Technologies using

- [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
- [https://expressjs.com/](https://expressjs.com/)
- [https://www.postgresql.org/](https://www.postgresql.org/)
