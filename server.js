const express = require('express');
const fetch = require('node-fetch');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/', async (req, res) => {
  const targetURL = 'https://www.rdhenry.com/';

  try {
    const response = await fetch(targetURL);
    let body = await response.text();

    // Inject a branded top bar before the <body> tag
    const topBarHTML = `
      <div style="position:fixed;top:0;left:0;width:100%;z-index:9999;background:#003366;color:white;padding:12px;text-align:center;font-family:sans-serif;">
        🔹 <strong>Premier Cabinet Partners</strong> – Official Rep for RD Henry Products
      </div>
      <div style="height:50px;"></div> <!-- Spacer so content isn't hidden -->
    `;

    // Insert the banner right after <body>
    body = body.replace(/<body.*?>/, match => `${match}${topBarHTML}`);

    res.send(body);
  } catch (err) {
    res.status(500).send('Error fetching page');
  }
});

app.listen(PORT, () => {
  console.log(`Proxy server running at http://localhost:${PORT}`);
});
