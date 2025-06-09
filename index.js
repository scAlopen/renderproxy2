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
      if (!targetUrl) retu
