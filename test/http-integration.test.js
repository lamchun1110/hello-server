const { test, before, after } = require('node:test');
const assert = require('node:assert');
const http = require('node:http');

let server;
let baseUrl;

before(async () => {
  const app = require('../src/app');
  server = http.createServer(app);
  await new Promise((resolve, reject) => {
    server.once('listening', () => {
      baseUrl = 'http://127.0.0.1:' + server.address().port;
      resolve();
    });
    server.on('error', reject);
    server.listen(0, '127.0.0.1');
  });
});

after(() => {
  if (server) {
    server.close();
  }
});

test('GET /slow returns 200 with body.elapsedMs >= 1900 and client elapsed >= 1900ms', async () => {
  const startedAt = Date.now();
  const res = await fetch(baseUrl + '/api/slow');
  const elapsed = Date.now() - startedAt;
  const body = await res.json();

  assert.strictEqual(res.status, 200);
  assert.ok(elapsed >= 1900, `client elapsed ${elapsed}ms < 1900ms`);
  assert.ok(body.elapsedMs >= 1900, `body.elapsedMs ${body.elapsedMs} < 1900ms`);
});

test('POST /echo with body over 1mb returns 413', async () => {
  const payload = JSON.stringify({ data: 'a'.repeat(2 * 1024 * 1024) });
  const res = await fetch(baseUrl + '/api/echo', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: payload,
  });

  assert.strictEqual(res.status, 413);
});

test('GET /slow with AbortSignal.timeout(500) rejects with AbortError', async () => {
  let err = null;
  try {
    await fetch(baseUrl + '/api/slow', {
      signal: AbortSignal.timeout(500),
    });
  } catch (e) {
    err = e;
  }

  assert.notEqual(err, null, 'expected fetch to reject');
        assert.strictEqual(err.name, 'TimeoutError');
});
