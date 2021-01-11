import socketio from './socketIO/socketio';

const express = require('express');
const http = require('http');

const port = 3001;

// create express/http server
const app = express();
const server = new http.createServer(app);

// create a socket io server
const io = socketio(server);

// listen for requests
server.listen(port, () => console.log(`listening on port ${port}`));
