import cardRoundLogic from './card-logic/cardRoundLogic';

/**
 * Pre-game logic that occurs before the spell-card game begins
 */
const TIMERLENGTH = 30000;

export default function pregame(socket, roomID) {
  // start timer in socket.io room
  socket.to(roomID).emit(PREGAMESTART);

  // send first 5 cards to each user in the room
  // TODO: turn into playerID
  // cards selected, and send cards to game
  const cards = cardRoundLogic();
  socket.to(roomID).emit(CARDS, cards);

  // On either timer TimeOut or Continue button press, start game
  const preGamePromsie = new Promise((fulfill, reject) => {
    // start timer
    timer = setTimeout(() => {
      // start the game
      socket.to(roomID).emit(PREGAMEFINISH);

      // send selected cards to the server-side game
      fulfill(cards);
    }, TIMERLENGTH);

    // if continue is heard, stop the timeout
    socket.on(CONTINUE, (msg) => {
      clearTimeout(timer);
      socket.to(roomID).emit(PREGAMEFINISH);

      // TODO: logic to replace the selected cards and generate new ones

      socket.to(roomID).emit(CARDS, cards);

      // send selected cards to the server-side game
      fulfill(cards);
    });
  }).catch(console.log('In pre-game.js, ERROR'));

  // if fulfilled then send the card information to the game
  preGamePromsie.then(
    (fulfilled = (res) => {
      // check if 5 cards are selected, if not return 5 new cards
      if (res.length !== 5) {
        return cardRoundLogic();
      }

      // return the selected cards
      return res;
    }),
    (rejected = (err) => {
      // if the promise is for somereason reject, return 5 new cards
      // TODO: disconnect the socket and reset the game?
      console.log(err);
      return cardRoundLogic();
    })
  );
}
