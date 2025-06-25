import { ref ,onMounted } from 'vue';

const suits = ["spade", "diamond", "club", "heart"];
const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];

function createDeck() {
    const deck = [];
    for (let suit of suits) {
      for (let [index,value] of ranks.entries()) {
        deck.push({ suit, rank:value , value:index });
      }
    }
    return deck;
  }
  
  function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
  }



export function useDeckCard() {
    const cardList = ref([]);
    const deckList =ref([])


    const resetCard = () => {
        const deck = createDeck();
        cardList.value = shuffleDeck(deck)
    }

    onMounted(() => {
        resetCard()
    });

    return {
        cardList,
        resetCard,
        deckList
    }
}