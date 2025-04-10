const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();

// Inject branding banner
const injectBanner = (html) => {
  const banner = `
    <div style="position: fixed; top: 0; left: 0; width: 100%; background: #004466; color: white; padding: 12px; z-index: 9999; text-align: center;">
      Powered by Premier Cabinet Partners – <a href="/" style="color: #00cfff;">Return Home</a>
    </div>
  `;
  return html.replace(/<body[^>]*>/i, match => `${match}${banner}`);
};

// Custom proxy with injection
app.use('/', async (req, res) => {
  const fetch = await import('node-fetch'); // Use ESM-friendly fetch
  const targetUrl = `https://www.rdhenry.com${req.url}`;
  
  try {
    const proxyRes = await fetch.default(targetUrl);
    const text = await proxyRes.text();
    const modified = injectBanner(text);
    res.send(modified);
  } catch (err) {
    res.status(500).send("Proxy error.");
  }
});

app.listen(3000, () => {
  console.log('Proxy server running at http://localhost:3000');
});
