const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  '/',
  createProxyMiddleware({
    target: '', // leave blank, will be set dynamically
    changeOrigin: true,
    router: (req) => {
      // Dynamically route to requested URL
      const targetUrl = req.query.url;
      if (!targetUrl) return 'https://example.com'; // default fallback
      return targetUrl;
    },
    pathRewrite: (path, req) => {
      return ''; // remove the path so it proxies exactly the target URL
    },
    onProxyReq(proxyReq, req, res) {
      // Remove the ?url= parameter so backend gets a clean request
      const urlObj = new URL(req.originalUrl, `http://${req.headers.host}`);
      urlObj.searchParams.delete('url');
      proxyReq.path = urlObj.pathname + urlObj.search;
    },
  })
);

app.get('/', (req, res) => {
  res.send(`
    <h1>Welcome to My Proxy</h1>
    <form method="GET" action="/">
      <input type="text" name="url" placeholder="Enter full website URL" style="width: 300px;" required />
      <button type="submit">Go</button>
    </form>
    <p style="color: red; margin-top: 1rem;">Use this proxy responsibly. Not responsible for misuse.</p>
  `);
});

app.listen(PORT, () => {
  console.log(\`Proxy server listening on port \${PORT}\`);
});
