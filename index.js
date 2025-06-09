
const express = require('express');
const { createBareServer } = require('@titaniumnetwork-dev/ultraviolet');
const uvPath = __dirname + '/node_modules/@titaniumnetwork-dev/ultraviolet';

const app = express();
const bare = createBareServer('/bare/');

app.use('/uv/', express.static(uvPath + '/public'));
app.use('/uv/service/', require(uvPath + '/server'));
app.use('/bare/', bare);

app.get('/', (req, res) => {
  res.send('<h1>Ultraviolet Proxy is Running</h1><p><a href="/uv/">Launch UV</a></p>');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Ultraviolet proxy is running on port ${PORT}`);
});
