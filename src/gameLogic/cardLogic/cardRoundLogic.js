import deck from '../dummyLogic/cardData';


export default function cardRoundLogic() {
    // TODO: get 5 cards, not yet discarded.
    let cardsToReturn = [];
    for (let i = 0; i < 5; i++) {
        cardsToReturn[i] = deck.card[i];
    }    
    return cardsToReturn;
}