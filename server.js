const http = require('http');
const main = require('./main');

main.set('port', process.env.PORT || 3000);
const server = http.createServer(main);

server.listen(process.env.PORT || 3000);