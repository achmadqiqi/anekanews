async function runFullSetup() {
  console.log("1. Executing Step 1: POST /_emdash/api/setup");
  const step1Res = await fetch("http://127.0.0.1:8787/_emdash/api/setup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-EmDash-Request": "1"
    },
    body: JSON.stringify({ title: "AnekaNews", includeContent: true })
  });
  console.log("Step 1 Status:", step1Res.status);
  const step1Data = await step1Res.json();
  console.log("Step 1 Result:", JSON.stringify(step1Data, null, 2));

  console.log("\n2. Executing Step 2: POST /_emdash/api/setup/admin");
  const step2Res = await fetch("http://127.0.0.1:8787/_emdash/api/setup/admin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-EmDash-Request": "1"
    },
    body: JSON.stringify({
      name: "Achmad Baihaqi",
      email: "achmadqiqi888@gmail.com"
    })
  });
  console.log("Step 2 Status:", step2Res.status);
  const step2Data = await step2Res.json();
  console.log("Step 2 Result:", JSON.stringify(step2Data, null, 2));

  console.log("\n3. Checking /_emdash/api/setup/status:");
  const statusRes = await fetch("http://127.0.0.1:8787/_emdash/api/setup/status");
  const statusData = await statusRes.json();
  console.log("Setup Status:", JSON.stringify(statusData, null, 2));
}

runFullSetup().catch(console.error);
