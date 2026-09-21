# Bonsai Test

A minimal Express API server with the `/api/hello` and `/api/health` routes, tested with Node's built-in `node:test` runner.

## Requirements

- Node.js 22+ (uses global `fetch`)

## Install

```bash
npm install
```

## Run

```bash
npm start
# or
node server.js
```

The server listens on `http://localhost:3000` (override with the `PORT` env variable).

## Test

```bash
npm test
# or
node --test
```

Uses `node:test` and global `fetch` against an ephemeral port — no test dependencies.

## Endpoints

| Method | Path        | Response                                   |
| ------ | ----------- | ------------------------------------------ |
| GET    | `/api/hello`| `{"message":"Hello from /api/hello!"}`     |
| GET    | `/api/health` | `{"status":"ok"}`                          |

Unknown routes return `404`.

## Project Layout

```
server.js            # entry point
src/api.js           # route definitions
src/app.js           # Express app (router mounted at /api)
test/api.test.js     # node:test suite
package.json
```
