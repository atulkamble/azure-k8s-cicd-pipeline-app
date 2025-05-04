const http = require('http');
const port = 3000;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('🚀 Hello from CodePipeline + CodeBuild + Node.js!\n');
});

server.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
