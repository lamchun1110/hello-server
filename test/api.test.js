const { test, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');

let server;
let baseUrl;

before(async () => {
  const app = require('../src/app');
  server = http.createServer(app);
  await new Promise((resolve, reject) => {
    server.listen(0, '127.0.0.1', (err) => {
      if (err) { reject(err); return; }
      baseUrl = 'http://127.0.0.1:' + server.address().port;
      resolve();
    });
  });
});

after(() => {
  if (server) {
    server.close();
  }
});

test('GET /api/hello returns 200 with greeting', async () => {
  const res = await fetch(baseUrl + '/api/hello');
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.message, 'Hello from /api/hello!');
});

test('GET /api/health returns 200 with status ok', async () => {
  const res = await fetch(baseUrl + '/api/health');
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.status, 'ok');
});

test('GET /api/unknown returns 404', async () => {
  const res = await fetch(baseUrl + '/api/unknown');
  assert.strictEqual(res.status, 404);
});

test('GET /api/hello sends application/json content-type', async () => {
  const res = await fetch(baseUrl + '/api/hello');
  assert.strictEqual(
    res.headers.get('content-type'),
    'application/json; charset=utf-8'
  );
});

test('GET /api/health sends application/json content-type', async () => {
  const res = await fetch(baseUrl + '/api/health');
  assert.strictEqual(
    res.headers.get('content-type'),
    'application/json; charset=utf-8'
  );
});

test('GET / returns 404', async () => {
  const res = await fetch(baseUrl);
  assert.strictEqual(res.status, 404);
});

test('GET /api returns 404', async () => {
  const res = await fetch(baseUrl + '/api');
  assert.strictEqual(res.status, 404);
});

test('POST /api/unknown returns 404', async () => {
  const res = await fetch(baseUrl + '/api/unknown', { method: 'POST' });
  assert.strictEqual(res.status, 404);
});

test('PUT /api/unknown returns 404', async () => {
  const res = await fetch(baseUrl + '/api/unknown', { method: 'PUT' });
  assert.strictEqual(res.status, 404);
});

test('DELETE /api/unknown returns 404', async () => {
  const res = await fetch(baseUrl + '/api/unknown', { method: 'DELETE' });
  assert.strictEqual(res.status, 404);
});

test('GET /api/echo?q=hello returns the query value', async () => {
  const res = await fetch(`${baseUrl}/api/echo?q=hello`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.q, 'hello');
});
test('GET /api/echo with no q param returns q undefined', async () => {
  const res = await fetch(`${baseUrl}/api/echo`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.q, undefined);
});
test('GET /api/echo?q= returns empty string for empty q', async () => {
  const res = await fetch(`${baseUrl}/api/echo?q=`);
  assert.strictEqual(res.status, 200);
  const body = await res.json();
  assert.strictEqual(body.q, '');
});
