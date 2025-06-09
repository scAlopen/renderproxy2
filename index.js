const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const url = require('url');

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', (req, res, next) => {
  const targetUrl = req.query.url;

  if (!targetUrl) {
    return res.status(400).send('Error: Please provide a URL as ?url=https://example.com');
  }

  // Validate URL format
  let parsed;
  try {
    parsed = new URL(targetUrl);
  } catch {
    return res.status(400).send('Error: Invalid URL format');
  }

  createProxyMiddleware({
    target: parsed.origin,
    changeOrigin: true,
    secure: false,
    selfHandleResponse: false,
    pathRewrite: (path, req) => {
      // Strip the "/?url=target" query, pass the pathname + search from target URL
      return parsed.pathname + parsed.search;
    },
    onError: (err, req, res) => {
      res.status(500).send('Proxy error: ' + err.message);
    }
  })(req, res, next);
});

app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
