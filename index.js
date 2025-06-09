const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
  const target = req.query.url;
  if (!target || !/^https?:\/\//.test(target)) {
    return res.send(`
      <h2>Simple UV-Style Proxy</h2>
      <form method="GET">
        <input name="url" placeholder="https://example.com" required style="width:300px"/>
        <button>Go</button>
      </form>
      <p>Enter a complete http:// or https:// URL</p>
    `);
  }

  return createProxyMiddleware({
    target,
    changeOrigin: true,
    secure: false,
    pathRewrite: (path, req) => req.originalUrl.replace('?url=' + encodeURIComponent(target), '')
  })(req, res, next);
});

app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
