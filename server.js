const express = require('express');
const _ = require('lodash');
const app = express();
const port = process.env.PORT || 8080; // Use PORT environment variable

// Read build env variable (set in BuildConfig)
const build_env_var = process.env.BUILD_ENV_MSG || "BUILD_ENV_MSG not set (runtime fallback)";
// Read runtime env variable (set in DeploymentConfig)
const runtime_env_var = process.env.RUNTIME_ENV_MSG || "RUNTIME_ENV_MSG not set (runtime fallback)";

app.get('/', (req, res) => {
  res.send(` <h1>Hello from my S2I Advanced App!</h1>
    <p>Build Environment Message (from build time): <strong>\<span class="math-inline">\{build\_env\_var\}</strong\></p\>
    <p>Runtime Environment Message (from runtime): <strong>\${runtime_env_var}</strong></p>
    <p>Current time: \${new Date().toISOString()}</p>
    <p>Using lodash: \{_.capitalize('hello world')}</p>`);
});

app.listen(port, () => {
  console.log(`Application listening at http://localhost:${port}`);
  console.log(`BUILD_ENV_MSG (verified in app): ${build_env_var}`);
  console.log(`RUNTIME_ENV_MSG (verified in app): ${runtime_env_var}`);
});

app.use((err, req, res, next) => {  // Error handling middleware
  console.error(err);
  res.status(500).send('Internal Server Error');
});

