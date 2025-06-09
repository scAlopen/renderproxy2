const express = require("express");
const { createBareServer } = require("@tomphttp/bare-server-node");
const { uvPath } = require("ultraviolet-static");
const path = require("path");
const http = require("http");

const app = express();
const bare = createBareServer("/bare/");

app.use((req, res, next) => {
  if (bare.shouldRoute(req)) return bare.routeRequest(req, res);
  next();
});

app.use(express.static(uvPath));

const server = http.createServer(app);
bare.attach(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Ultraviolet proxy running on port ${PORT}`);
});
