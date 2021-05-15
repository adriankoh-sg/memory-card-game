export const CARD_PAIRS_VALUE = { min: 1, max: 100 } //the value appear on each pair. 1 to 100

export const GAME_SETTINGS = {
    totalCards: 12,
    cardOpenDelay: 700, //delay time for the card pair to remain open
    cardFlipDelay: 300, //delay time for the card to flip
}

export function generateNumber (min, max) {
    return Math.floor(Math.random()*(max-min+1)+min)
}

// Function to generate the pair sequence. 
// Example card 1 pair with card 3, card 2 pair with card 6, etc...
export function generatePairsSequence() {
    let pairs = []
    let i =0
    for (i=0; i<GAME_SETTINGS.totalCards/2; i++) {
        let n = 0
        do {
            n = generateNumber(GAME_SETTINGS.totalCards/2, GAME_SETTINGS.totalCards - 1) // - 1 as idx or array starts from zero
            //repeat loop if the number is already found in the pair
        } while (pairs.find( element => element.n === n ) !== undefined)
        pairs.push({ i, n })
    }

    return pairs // output ==> [ { i: 0, n: 6 }, { i: 1, n: 9 } ... ]
}

export function generateCards() {
    let pairs = generatePairsSequence()
    let cards = []
    let v = 0

    pairs.map( (item) => {
        do {
            v = generateNumber(CARD_PAIRS_VALUE.min, CARD_PAIRS_VALUE.max)
            //repeat loop if the value already exist
        } while (cards.find( element => element.v === v ) !== undefined)
        
        cards.push( {i: item.i, n: item.n, v })
    })
    return cards
}