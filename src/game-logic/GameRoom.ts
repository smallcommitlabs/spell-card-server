import { Socket } from "socket.io";
import { GameConstants } from "./GameConstants";

/**
 * Game room for an individual user
 */
class GameRoom {
    // connected socket
    private socket: Socket;

    // decks of the player and bot
    private playerOneDeck; // type: cardDeck

    // current hand of the player and bot
    private playerHand; // type: cardHand

    // health of player and bot
    private playerOneHealth: number;
    private playerOneShield: number;
    private bossHealth: number;
    private bossShield: number;

    // Spaced Repition List for player
    private playerSRLList; // type: SRLList

    constructor(socket: Socket) {
        this.socket = socket;

        // set the player health and bot health and shield
        this.playerOneHealth = GameConstants.PLAYERHEALTH;
        this.bossHealth = GameConstants.BOSSHEALTH;

        // shield size
        this.bossShield = GameConstants.SHIELDSIZE;
        this.playerOneShield = GameConstants.SHIELDSIZE;

        // initiate pre-game logic
        this.preGameLogic()
    }

    /**
     * Pre game logic
     */
    private preGameLogic() {
        
    }

    /** 
     * Main Game Loop
     */
    private GameLoop() {

    }

    /**
     * Round Logic
    */
    private roundLogic() {
        
    }



}