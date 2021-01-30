import { deck } from './dummy-logic/cardData';
import { Deck, Card } from '../types';
import {GameConstants} from './GameConstants';
import { Socket } from 'socket.io';
import {GameEvent} from '../Constants';

// The card array
let cards: Card[] = new Array();
let hand: Card[] = new Array();

export function preGame( socket: Socket ): Card[] {
    // get deck from server
    const promise: Promise<Deck> = new Promise((resolve, reject) => {
        // TODO: call to get deck, for now is simply just receiving dummy data
        if (deck !== null && deck.card.length == 15) {
            resolve(deck);
        }
    });

    promise.then(
        ((res) => {
            // add card response into cards array
            cards = loadCard(res);
            // randomise cards
            cards = createRandomCardList(cards)
            // get a hand of cards
            hand = getRandomCards(cards)
        }),
        err => {
            console.log("error getting the deck");
        });

    // pick a hand and send it to socket
    socket.emit(GameEvent.PREGAMESTART, { data: "hand" });

    // start pre-round 30s timer
    let promise2 = new Promise((resolve, reject) => {
        let timeout = setTimeout(() => {
            resolve("timeout")
            console.log("timeout!")
        }, 5000);

        socket.on("aaa", (msg) => {
            resolve(msg)
        })
    })

    // wait for either continue signal or timeout
    promise2.then(res => {
        if (res === "timeout") {
            console.log("here")
            return cards;
        } else if (res !== null) {
            // TODO: add the cards
            // resend the new hands to the user via the socket
            socket.emit(GameEvent.NEWHAND, {data: "hand"})

            return cards;
        }
    })

    return cards;
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
