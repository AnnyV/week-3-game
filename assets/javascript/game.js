// 1. get a ramdom word
// 2. draw a blank line for each later in the word.
// 3. Start guessing latter.
// 4. fill the latter in the blanks if the player guess correctly.
// 5. Draw part of the "hangman" when the player guess wrong. (8 guesses).
// 6. the palyer win when they guess the carrect word
// 7. when the game ends, start over with a new word.

// System.out.println();
// <h2> Remenber watching saturday morning cartoons with a big bowl of cereal</h2>
// <h2> Let's bring back those memories and show me what do you have <h2>
// <h3> It's time to play and have some fun<h3>

var newLetter = false;
var gameover = false;
var wins = 0;
var losses = 0;
var guesses = 8;
var hits = 0;
var spaces = 0;
var guessedLetters = [];
var words = ["scooby doo", "tom and jerry", "thundercats", "voltron", "transformers", "mighty mouse",
    "ren and stimpy", "donald duck", "animaniacs", "beetlejuice", "garfield", "inspector gadget",
    "smurfs", "gummi bears", "johnny quest", "the justice league", "batman", "super man", "south park",
    "looney tunes", "the jetsons", "the bugs bunny show", "the flinstones", "jem", "dragon ball z", "Silvester",
    "sam", "tazmanian demon", "porky", "twetty",
]

var randomWord = " ";

var hiddenWord = "";
var message = " ";
var hdrMsg = " ";
var gameHTML = " ";
var infoHTML = " ";
var letter = " ";

function validLetter() {
    if ((letter >= "a") && (letter <= "z")) {
        return true
    } else {
        return false
    }
}

function writeHTML() {

	gameHTML ="<h2>" + message + "</h2>" +
	 "<h2>Word: " + hiddenWord + "</h2>" +
	"<h2>Guessed letters: " + guessedLetters.toString() +
	"<h2>Number of guesses remaining: " + guesses + "</h2>"

	infoHTML = "<h1>" + hdrMsg + "</h1>" +
	"<h2>Guess a letter of the word by pressing a letter on the keyboard.</h2>" +
	"<h2>Wins: " + wins +
	"<h2>Losses: " + losses ;




	document.getElementById("game").innerHTML = (gameHTML);
	document.getElementById("info").innerHTML = (infoHTML);
}

function buildHiddenWord() {
    hits = 0;
    spaces = 0;
    hiddenWord = "";

    //Check to see if letters guessed match within the random word
    //or if we just got a new random word then this will simply create our hidden word string 
    for (var i = 0; i < randomWord.length; i++) {
        if (randomWord.substr(i, 1) === " ") {
            //spaces are ignored
            hiddenWord += "&nbsp;&nbsp;"
            spaces++
        } //end-if space check
        else if (guessedLetters.indexOf(randomWord.substr(i, 1)) >= 0) {
            //Character of random word matches a guessed letter
            hiddenWord += randomWord.substr(i, 1) + " "
            hits++
        } //end if of letter match
        else {
            //guessed letter doesn't match the character in random word
            hiddenWord += "_ "
        }
    } //end for loop
} //end function

function getRandomWord() {
    randomWord = words[Math.floor(Math.random() * words.length)];
}

function checkNewLetter() {

    if (guessedLetters.indexOf(letter) < 0) {
        //letter was not guessed yet. continue process
        return true
    } else {
        //the letter was guessed alredy
        return false
    }
}

function checkGuessedLetter() {
    //check if the current letter guessed was a hit or miss
    if (randomWord.indexOf(letter) >= 0) {
        //the letter pushed is part of the random word
        message = "Good Job! You found a letter!"
    } else {
        message = "Ooops! Try Again!"
        guesses--
    }

}

function checkResults() {

    if ((hits + spaces) === randomWord.length) {
        wins++
        message = "Congrats! You Won!!! Now try a new word!"
        return true

        //reset the game with a new word
        //start over
    } else if (guesses === 0) {
        //LOSER
        losses++ 
        message = "You suck! Better luck next time. Try Again!"
        return true
    } else {
        return false
    }

}

function processLetter() {

    //check to see if the guessed letter was guessed already
    newLetter = checkNewLetter()

    //if not guessed, process letter 
    if (newLetter === true) {

        guessedLetters.push(letter)


        checkGuessedLetter()

        buildHiddenWord()

        gameover = checkResults()

    } //end new letter

    //if guessed already, don't add to array and let user know they guessed that letter already
    //and don't process the letter any further        
    else { // we do not have a new letter
        message = "You tried that letter already!"

    } // end of new letter process

    //check to see if game is over

} //end function processLetter

//-------------------Program starts here-------------------------------------

getRandomWord()

buildHiddenWord()

hdrMsg = "Welcome to Hangman!"
writeHTML()

// gameHTML = "<h1>" + hdrMsg + "</h1>" +
//     "<h2>Try to guess the word: " + hiddenWord + "</h2>" +
//     "<h2>Number of guesses remaining: " + guesses + "</h2>" +
//     "<h2>Wins: " + wins +
//     "<h2>Losses: " + losses +
//     "<h2>Guess a letter of the word by pressing a letter on the keyboard.</h2>"

// document.getElementById("game").innerHTML = (gameHTML);

document.onkeyup = function(event) {
        letter = String.fromCharCode(event.keyCode).toLowerCase();

        if (validLetter()) {
            processLetter()

            if (gameover) {

                randomWord = ""
                hiddenWord = ""
                guessedLetters = []
                gameover = false
                guesses = 8

                getRandomWord()

                buildHiddenWord()
            }

            // gameHTML = "<h1>Hangman!</h1>" +
            //     "<h2>" + message + "</h2>" +
            //     "<h2>word: " + hiddenWord + "</h2>" +
            //     "<h2>Guessed letters: " + guessedLetters.toString() +
            //     "<h2>Number of guesses remaining: " + guesses + "</h2>" +
            //     "<h2>Wins: " + wins +
            //     "<h2>Losses: " + losses +
            //     "<h2>Guess a letter of the word by pressing a letter on the keyboard.</h2>"

            // document.getElementById("game").innerHTML = (gameHTML);
        }
        else {
        	
            message = "You pressed an invalid key. Do you know what letters are?"


        }

        hdrMsg = "Hangman!"

        writeHTML()

    } //End of onkeyup event
