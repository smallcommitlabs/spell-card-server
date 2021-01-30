import { CardTypes } from '../../Constants';
import {Deck, Card} from '../../types';

/**
 * cardData.js contains card information for a generic deck for 
 * testing purposes 
 *  - name -> card name
 *  - class -> card type
 *  - rank -> card rank
 *  - discarded -> whether or not the card has been used
 *  - image -> image location for card
 */
export const deck: Deck = {
    card: [
      {
        name: 'Sword1',
        class: 'Attack',
        rank: 1,
        discarded: false,
        image: CardTypes.ATTACK,
      },
      {
        name: 'Sword2',
        class: 'Attack',
        rank: 2,
        discarded: false,
        image: CardTypes.ATTACK,
      },
      {
        name: 'Sword3',
        class: 'Attack',
        rank: 3,
        discarded: false,
        image: CardTypes.ATTACK,
      },
      {
        name: 'Sword4',
        class: 'Attack',
        rank: 4,
        discarded: false,
        image: CardTypes.ATTACK,
      },
      {
        name: 'Sword5',
        class: 'Attack',
        rank: 5,
        discarded: false,
        image: CardTypes.ATTACK,
      },
      {
        name: 'Shield1',
        class: 'Defence',
        rank: 1,
        discarded: false,
        image: CardTypes.DEFENCE,
      },
      {
        name: 'Shield2',
        class: 'Defence',
        rank: 2,
        discarded: false,
        image: CardTypes.DEFENCE,
      },
      {
        name: 'Shield3',
        class: 'Defence',
        rank: 3,
        discarded: false,
        image: CardTypes.DEFENCE,
      },
      {
        name: 'Shield4',
        class: 'Defence',
        rank: 4,
        discarded: false,
        image: CardTypes.DEFENCE,
      },
      {
        name: 'Shield5',
        class: 'Defence',
        rank: 5,
        discarded: false,
        image: CardTypes.DEFENCE,
      },
      {
        name: 'WoooWah1',
        class: 'Magic',
        rank: 1,
        discarded: false,
        image: CardTypes.MAGIC,
      },
      {
        name: 'WoooWah2',
        class: 'Magic',
        rank: 2,
        discarded: false,
        image: CardTypes.MAGIC,
      },
      {
        name: 'WoooWah3',
        class: 'Magic',
        rank: 3,
        discarded: false,
        image: CardTypes.MAGIC,
      },
      {
        name: 'WoooWah4',
        class: 'Magic',
        rank: 4,
        discarded: false,
        image: CardTypes.MAGIC,
      },
      {
        name: 'WoooWah5',
        class: 'Magic',
        rank: 5,
        discarded: false,
        image: CardTypes.MAGIC,
      },
    ],
  };
