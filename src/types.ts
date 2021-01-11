// interfaces for differing game data objects
export interface StartGame {
    userID: string;
    task: string;
}

export interface Card {
    name:  string;
    class: string,
    rank: number,
    discarded: boolean,
    image: string,
}