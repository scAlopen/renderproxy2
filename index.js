const express = require("express");
const http = require("http");
const { createBareServer } = require("@tomphttp/bare-server-node");

const app = express();
const bare = createBareServer("/bare/");

// Route bare client endpoints
app.use((req, res, next) => {
  if (bare.shouldRoute(req)) return bare.routeRequest(req, res);
  next();
});

// Serve static UI assets
app.use("/", express.static("ultraviolet-static"));

const server = http.createServer(app);
bare.attach(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`UV proxy running on port ${PORT}`));
