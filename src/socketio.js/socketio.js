import pregame from '../gameLogic/preGame';
const socketio = require('socket.io');

const ROOMID = "room-student-ID#1";


export default server => {
    const io = socketio.listen(server);

    // on client connection, 
    io.on("connection", socket => {
        console.log("client connected: " + socket.id);
        // send the user to a game room
        // TODO: make unique
        socket.join(ROOMID);

        // wait for start message from client
        socket.on("play", socket => {
            // TODO: start pre-game logic
            let cards = pregame(socket, ROOMID);

            // TODO: pass cards to the game and start game
        });

        // TODO: on disconnect pause and keep room open for 1 minute
        socket.on("disconnect", () => {
            console.log("client disconnected: " + socket.id);
        })
    });

    return io;
}