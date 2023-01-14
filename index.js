const suits = [0,1,2,3];
// 11 = Jack, 12 = Queen, 13 = King, 14 = Ace
const  numbers = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

let deck = new Array();

// returns a full deck of 52 card objects
function getDeck() {
	for(let i = 0; i < numbers.length; i++) {
		for(let x = 0; x < suits.length; x++) {
            let card = {number:numbers[i], Suit:suits[x]};
			deck.push(card);
		}
	}
}


//Takes getDeck() as input and "shuffles" the deck. Returns the same deck shuffled. 
function shuffleDeck(d){
    let m = d.length, t, i;
    
    // while there remain elements to shuffle...
    while(m){
        // pick a remaining element...
        i = Math.floor(Math.random() * m--);
        
        // and swap it with the current element.
        t = d[m];
        d[m] = d[i];
        d[i] = t;
    }
    
    return d;
}

let playerHand = new Array();
let cardsInHand = 5;
function dealHand() {
	for(i = 0; i < cardsInHand; i++) {
		let temp = deck[i];
    playerHand.push(temp);
	}
}


function sortHand() {
    playerHand.sort(function(a, b) {
        return a.number - b.number;
    });
}


// check if hand is full

function isHandFull() {
    if(playerHand.length == 52) {
        return true;
    }
    else {
        return false;
    }
}


// check if hand is empty

function isHandEmpty() {
    if(playerHand.length == 0) {
        return true;
    }
    else {
        return false;
    }
};





















//sort the players hand. Returns the same array sorted.
function sortCards() {
  let swap;
  do {
    swap = false;
    for (let i = 0; i < playerHand.length - 1; i++) {
      if (playerHand[i].number > playerHand[i + 1].number) {
        let temp = playerHand[i + 1].Rank;
        playerHand[i + 1].Rank = playerHand[i].Rank;
        playerHand[i].Rank = temp;
        swap = true;
      }
    }
  } while (swap);
  
  return playerHand;
};



// Check if the player's cards all have the same suit


function checkSameSuit() {
    for(let i = 1; i < playerHand.length; i++){
        if(playerHand[i].Suit !== playerHand[0].Suit)
            return false;
    }
    return true;
}

// Counts the number of player's cards that have the same rank.
function checkCardNums(num) {
     let count = 0;
    for (let i = 0; i < playerHand.length; i++) {
        if (playerHand[i].Rank === num) {
            count++;
        }
    }
    return count;
}


// Check if the player's cards are in sequence


function checkSequence(){
    for(let i = playerHand.length - 1; i > 0; i--) {
        let oneCard = playerHand[i].Rank;
        let twoCard = playerHand[i - 1].Rank;
        let one = oneCard - twoCard;
        if(one !== 1){
            return false;
        } else {
            return true;
        }
    }
}

// Functions to check for specific hands


// ranks for a royal flush
let royalFlush = [10, 11, 12, 13, 14];
let count = 0;
// Compare the player's hand ranks with RF hand ranks.
function checkRfRankCount() {
    for(let i = 0; i < playerHand.length; i++) {
        if(royalFlush.includes(playerHand[i].Rank)) {
          count++;  
        }
    }
    return count;
}

// Check if the RankCount and SuitCount both return true
function checkRoyalFlush(){
    // Run RF Rank Count
    checkRfRankCount();
    
    // Run Check Same Suit
    checkSameSuit();
    
    // if the rank count is 5 and suit is true... then you have a royal flush
    if(checkRfRankCount == 5 && checkSameSuit == true) {
        return true; 
    } else {
        return false;
    }
}



// Check if the player's hand suit is the same.
function checkStraightFlush() {
    // Check Card Sequence
    checkSequence()
    
    // Check for Same Suit
    checkSameSuit();
    console.log(checkRoyalFlush());
    
    // If cards are in sequence and all the same suit..
    if(checkSequence && checkSameSuit == true) {
        return true; 
    } else {
        return false;
    }
}


function checkFourKind() {
    for(let i = 0; i <playerHand.length; i++){
        if(checkCardNums(playerHand[i].Rank) == 4) {
            return true;
            break;
        } else {
            return false;
            continue;
        }
    }
}


function checkStraight() {
    checkSequence();
    
    if(checkSequence() == true){
        return true;
    } else {
        return false;
    }
}


function checkThreeOfKind() {
    for(let i = 0; i <playerHand.length; i++){
        if(checkCardNums(playerHand[i].Rank) == 3) {
            return true;
            break;
        } else {
            return false;
            continue;
        }
    }
    
}


function checkTwoPair(arr) {
    
    for(let i = 0; i <playerHand.length; i++){
        if(checkCardNums(playerHand[i].number) == 2) {
            arr = playerHand[i].number;
            console.log(arr);
            break;
        } 
    }
    for(let j = 3; j <playerHand.length; j++){
        if(checkCardNums(playerHand[j].number) == 2) {
            return true;
            break;
        } else {
            return false;
        }
    }
    
}

//checkTwoPair();


// Check for Pair


function checkPair() {
    for(let i = 0; i <playerHand.length; i++){
        if(checkCardNums(playerHand[i].number) == 2) {
            return true;
            break;
        } else {
            return false;
            continue;
        }
    }
    
}

//checkPair();


// Call to run high card


function highCard() {
    
    let highnumber = playerHand[4].number;
    let highSuit = playerHand[4].Suit;
    
    // If the high card number equals...
    if(highnumber == 11){
        highnumber = "Ace";
    } else if(highnumber == 12) {
        highnumber = "Queen";
    } else if(highnumber = 13) {
        highnumber = "King";
    } else if(highnumber == 14) {
        highnumber = "Ace";
    }

    // If the high card suit equals...
    if(highSuit == 0){
        highSuit = "Spades";
    } else if(highSuit == 1) {
        highSuit = "Diamonds";
    } else if(highSuit = 2) {
        highSuit = "Hearts";
    } else if(highSuit == 3) {
        highSuit = "Clubs";
    }
    
    return "High card is" + highnumber + " of " + highSuit;
        
}



// Create the deck
getDeck();
    
// Shuffle the deck
shuffleDeck(deck);
    
// Deal cards to the player
dealHand();

// Ask player if they want to change cards.
    
// Sort player's hand
sortCards();

// Show player's cards
console.log(playerHand);


// Switch to run card hand check



switch (true) {
    case checkRoyalFlush():
        console.log("You have a Royal Flush!");
        break;
    case checkStraightFlush():
        console.log("You have a Straight Flush!");
        break;
    case checkFourKind():
        console.log("You have a Four of a Kind!");
        break;
    case checkStraight():
        console.log("You have a Straight!");
        break;
    case checkThreeOfKind():
        console.log("You have a Three of a Kind!");
        break;
    case checkTwoPair():
        console.log("You have Two Pairs!");
        break;
    case checkPair():
        console.log("You have a Pair!");
        break;
    default:
        console.log(highCard());
}




// deal cards to player

playerHand = new Array();
 cardsInHand = 5;
function dealHand() {
	for(i = 0; i < cardsInHand; i++) {
		let temp = deck[i];
    playerHand.push(temp);
	}
}


// Give player two new cards

const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");
const card3 = document.getElementById("card3");
const card4 = document.getElementById("card4");
const card5 = document.getElementById("card5");
const fiveCards = [card1, card2, card3, card4, card5];
const suitNames = ["Spades", "Diamonds", "Hearts", "Clubs"];

// Display cards to player
function displayCards() {
	for(let i = 0; i < playerHand.length; i++) {
		fiveCards[i].innerHTML = playerHand[i].number + " of " + playerHand[i].Suit;
	}
}