const express = require('express');
const { createBareServer } = require('@tomphttp/bare-server-node');
const { uvPath } = require('@titaniumnetwork-dev/ultraviolet');
const uv = require('@titaniumnetwork-dev/ultraviolet')();

const app = express();
const bare = createBareServer('/bare/');

app.use(express.static(uvPath));
app.use((req, res) => uv(req, res));
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`UV proxy listening on port ${PORT}`);
});

bare.attach(server);