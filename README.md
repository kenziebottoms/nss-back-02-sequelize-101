# Sequelize 101

This is an API designed to practice Sequelize queries and operations.

![](https://img.shields.io/badge/modularity-nodejs-green.svg)
![](https://img.shields.io/badge/templating-n/a-lightgrey.svg)
![](https://img.shields.io/badge/data-postgresql-blue.svg)

## Run locally

```bash
git clone git@github.com:kenziebottoms/nss-back-02-sequelize-101.git
cd nss-back-02-sequelize-101
npm install
npm start
```

## Endpoints

| Endpoint               | Method  | Result                       |
| ---------------------- | ------- | ---------------------------- |
| `/directors`           | `GET`   | Get all directors            |
| `/directors`           | `POST`  | Create new director          |
| `/directors/:id`       | `GET`   | Get one director by ID       |
| `/directors/:id/shows` | `GET`   | Get all shows by director ID |
| `/shows`               | `GET`   | Get all TV shows             |
| `/shows/:id`           | `GET`   | Get one TV show by ID        |
| `/shows/:id`           | `PATCH` | Update one TV show by ID     |
| `/users`               | `GET`   | Get all users                |
| `/users/:id`           | `GET`   | Get one user by ID           |
| `/users/:id/favorites` | `GET`   | Get all favorites by user ID |
| `/favorites`           | `POST`  | Post new favorite            |

## Pages
| URL             | Description                                 |
| --------------- | ------------------------------------------- |
| `/new-director` | Provides a form for creating a new director |