const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 8000;
const PUBLIC_DIR = path.resolve(__dirname);

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Canonical host redirection for SEO (redirect www to root domain, except sitemap.xml and robots.txt)
  const host = req.headers['host'] || '';
  let reqPath = decodeURIComponent(req.url.split('?')[0]);
  if (host.startsWith('www.') && reqPath !== '/sitemap.xml' && reqPath !== '/robots.txt') {
    const cleanHost = host.replace(/^www\./, '');
    res.writeHead(301, { 'Location': `https://${cleanHost}${req.url}` });
    return res.end();
  }
  if (reqPath === '/' || reqPath === '') {
    reqPath = '/index.html';
  }

  // Resolve safe file path
  let filePath = path.normalize(path.join(PUBLIC_DIR, reqPath));
  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('403 Forbidden');
  }

  fs.stat(filePath, (err, stats) => {
    if (err) {
      // If file not found and doesn't have an extension, try adding .html
      if (err.code === 'ENOENT' && !path.extname(filePath)) {
        const htmlPath = filePath + '.html';
        if (fs.existsSync(htmlPath)) {
          return serveFile(htmlPath, req, res);
        }
      }
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    if (stats.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
      return serveFile(filePath, req, res);
    }

    serveFile(filePath, req, res);
  });
});

function serveFile(filePath, req, res) {
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME_TYPES[ext] || 'application/octet-stream';

  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('404 Not Found');
    }

    const headers = {
      'Content-Type': contentType,
      'Content-Length': stats.size,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=86400'
    };

    if (req.method === 'HEAD') {
      res.writeHead(200, headers);
      return res.end();
    }

    res.writeHead(200, headers);
    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
  });
}

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server listening on 0.0.0.0:${PORT}`);
});
