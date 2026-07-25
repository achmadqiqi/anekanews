import http from 'http';

async function testLocalLogin() {
  console.log("=== MEMULAI PENGUJIAN OTOMATIS LOGIN & SETUP ===");

  // 1. Hit /quick-login
  const req = http.request('http://127.0.0.1:8787/quick-login', { method: 'GET' }, (res) => {
    console.log(`[1] /quick-login HTTP Status: ${res.statusCode}`);
    console.log(`[1] Headers:`, res.headers);
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.log(`[1] Body length: ${body.length}`);

      // 2. Query status endpoint
      http.get('http://127.0.0.1:8787/_emdash/api/setup/status', (res2) => {
        let body2 = '';
        res2.on('data', chunk => body2 += chunk);
        res2.on('end', () => {
          console.log(`[2] /_emdash/api/setup/status Response:`, body2);
        });
      });
    });
  });

  req.on('error', (err) => {
    console.error("Test error:", err);
  });
  req.end();
}

testLocalLogin();
