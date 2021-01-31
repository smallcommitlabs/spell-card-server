import { deck } from './dummy-logic/cardData';
import { Deck, Card } from '../types';
import {GameConstants} from './GameConstants';
import { Socket } from 'socket.io';
import {GameEvent} from '../Constants';

// The card array
let cards: Card[] = new Array();
let hand: Card[] = new Array();

export function preGame(playerID: number, socket: Socket ): Card[] {
    // get the deck of the user
    getDeck(playerID);

    // send the hand to the game
    socket.emit(GameEvent.PREGAMESTART, { data: "hand" });
    
    // wait for 30s timer or interupt to occur
    preGameTimer(socket);
   
    return cards;
}

async function preGameTimer(socket: Socket) {
    // start pre-round 30s timer
    let promise: Promise<{type: string, msg: object | null}> = new Promise((resolve, reject) => {
        let timeout = setTimeout(() => {
            resolve({type: "timeout", msg: null})
            console.log("the 5 seconds timed out!")
        }, 5000);
        console.log("Started 5 second timeout!");

        socket.on("aaa", (msg) => {
            resolve({type: "update", msg: msg})
        })
    })

    // wait for the promise timeout or hand refresh
    let res = await promise;

    if (res.type === "update" ) {
        // TODO: change hand
        socket.emit(GameEvent.NEWHAND, JSON.stringify(hand));
    }
}

/**
 * an async function that receives the deck of the player
 * @param playerID 
 */
async function getDeck(playerID: number) {
    const promise: Promise<Deck> = new Promise((resolve, reject) => {
        // TODO: call to get deck, for now is simply just receiving dummy data
        if (deck !== null && deck.card.length == 15) {
            setTimeout(() => {
                console.log("received deck of player: " + playerID);
                resolve(deck);
            }, 1000);
            console.log("waiting for deck of player: " + playerID);
        }
    });

    try {
        // wait for player deck to return
        let playerDeck = await promise;
        // add card response into cards array
        cards = loadCard(playerDeck);
        // randomise cards
        cards = createRandomCardList(cards)
        // get a hand of cards
        hand = getRandomCards(cards);

    } catch (error) {
        console.log(error);
    }

}

/**
 * loads the cards into an array
 * 
 * @param Deck 
 */
function loadCard(Deck: Deck): Card[] {
    let randomCards: Card[] = new Array();
    let a = 0;

    for (const card of Deck.card) {
        randomCards[a] = card;
        a++;
    }
    return randomCards
}

/**
  * This method gets the randomCards list and shuffles all the cards in the array
  * 
  * @param cards
  */
function createRandomCardList(cards: Card[]): Card[] {
    let currentIndex = cards.length;
    let temporaryValue;
    let randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }

    return cards;
}

/**
 * This method gets the last cards from the randomCards array and places them
 */
function getRandomCards(cards: Card[]): Card[] {
    const returnedCards: Card[] = new Array();
    let j = 0;
    let numOfCards = GameConstants.HANDSIZE;

    for (let i = cards.length - 1; i >= cards.length - numOfCards; i--) {
        // If the wanted index is smaller than 0, then the deck has ended.
        if (i < 0) break;
        returnedCards[j] = cards[i];
        j++;
    }
    // Change the length of the deck and remove the cards that have been added to hand
    cards.length = cards.length - numOfCards;
    return returnedCards;
}

// At the start of the game if the user wants to return their cards, this will read the card to randomCards.
function replaceCards(card: Card[], readdedCard: Card) {
    card.push(readdedCard);
}
