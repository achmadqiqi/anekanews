import fetch from 'node-fetch';

async function simulateBrowserSession() {
  console.log("=================================================");
  console.log("  SIMULASI NAVIGASI BROWSER DENGAN COOKIE SESI  ");
  console.log("=================================================\n");

  // Step 1: Hit /quick-login
  console.log("🌐 [Browser] Membuka URL: http://127.0.0.1:8787/quick-login ...");
  const res1 = await fetch("http://127.0.0.1:8787/quick-login", {
    redirect: "manual"
  });

  console.log(`📥 [Response 1] Status Code: ${res1.status} ${res1.statusText}`);
  const setCookie = res1.headers.get("set-cookie");
  console.log(`🔑 [Cookie Diterima Browser]:`, setCookie || "(Cookie diset di KV session)");

  const html1 = await res1.text();
  console.log(`📄 [HTML Rendered 1]:\n${html1.substring(0, 300)}...\n`);

  // Step 2: Access /_emdash/admin using the session cookie
  console.log("🌐 [Browser] Mengikuti Redirect ke: http://127.0.0.1:8787/_emdash/admin ...");
  const headers2 = {};
  if (setCookie) {
    headers2["Cookie"] = setCookie;
  }

  const res2 = await fetch("http://127.0.0.1:8787/_emdash/admin", {
    headers: headers2,
    redirect: "manual"
  });

  console.log(`📥 [Response 2] Status Code: ${res2.status} ${res2.statusText}`);
  const location = res2.headers.get("location");
  if (location) {
    console.log(`↪️ [Location Header]: ${location}`);
  }

  const html2 = await res2.text();
  console.log(`📄 [HTML Content 2 Snippet]:\n${html2.substring(0, 400)}...\n`);

  console.log("=================================================");
  console.log("  PENGUJIAN BROWSER LOKAL SELESAI");
  console.log("=================================================");
}

simulateBrowserSession().catch(console.error);
