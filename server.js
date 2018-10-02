const http = require('http');

//Custom made modules
const config = require('./config/keys.js');
const app = require('./api/app.js');

const server = http.createServer(app);

server.listen(config.server.port, (error) => {
  if(!error) {
    console.log("The server is running on port: " + config.server.port);
  }
});
