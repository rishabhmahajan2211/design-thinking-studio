import os
import http.server
import socketserver

PORT = int(os.environ.get("PORT", 8000))

class CustomHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        if self.path.endswith('.html') or self.path == '/' or '?' in self.path and '.html' in self.path:
            self.send_header('Cache-Control', 'no-cache')
        else:
            self.send_header('Cache-Control', 'public, max-age=86400')
        super().end_headers()

if __name__ == "__main__":
    with socketserver.TCPServer(("0.0.0.0", PORT), CustomHandler) as httpd:
        print(f"Serving on 0.0.0.0:{PORT}")
        httpd.serve_forever()
