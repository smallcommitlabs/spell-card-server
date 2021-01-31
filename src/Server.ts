import { Socket } from "socket.io";
const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const GameRoom = require('./game-logic/GameRoom');

// init express function app
var app = express();
// create http server, that the express function is passed to
var server = http.createServer(app);
// init an instance of socket.io and pass the http server to it
var io = socketIO(server);

// array of all game rooms open, each player receives their own room!
var gameRooms = new Array()

// listen for incoming sockets using `connection`, this will be called when a client tries to connect
io.on("connection", (socket: Socket) => {
    // get the socket id
    const id: number = Number(socket.id);
    console.log("A user connected: " + id);

    // add a gameroom for a player, to the array
    gameRooms[id] = new GameRoom(id, socket)

    // listen for disconnect of a socket.
    socket.on("disconnect", () => {
        console.log("A user disconnected:" + id);

        // remove the gameroom from the array
        delete gameRooms[id];
    });
});

// make server listen to port 3000
server.listen(3000, () => {
    console.log("listening to port: *3000");
});