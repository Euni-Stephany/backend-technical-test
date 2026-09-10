# Backend Technical Test

REST API sederhana untuk mengelola data users

## Tech Stacks

- Node.js — JavaScript runtime
- Express.js — Backend web framework
- SQLite — Database
- better-sqlite3 — SQLite driver

## Run Locally

npm install
npm start

server berjalan di:
http://localhost:4000

## API Endpoint

| Method | Endpoint   | Description    |
| ------ | ---------- | -------------- |
| GET    | /users     | Get all users  |
| GET    | /users/:id | Get user by ID |
| POST   | /users     | Create user    |
| PATCH  | /users/:id | Update user    |
| DELETE | /users/:id | Delete user    |

## Example Request

### POST /users

{
"name" : "Lydia",
"email": "lydia@example.com"
}

## Live API

https://backend-technical-test-ujbq.onrender.com/

## Repository

https://github.com/Euni-Stephany/backend-technical-test/tree/main/src
