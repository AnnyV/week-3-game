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
    "looney tunes", "the jetsons", "the bugs bunny show", "the flinstones", "jem", "dragon ball z"
]

var randomWord = " ";

var hiddenWord = "";
var message = " ";
var gameHTML = " ";
var letter = " ";

randomWord = words[Math.floor(Math.random() * words.length)];

for (var i = 0; i < randomWord.length; i++) {

    if (randomWord.substr(i, 1) === " ") {
        letter = randomWord.substr(i, 1)
        hiddenWord += "&nbsp;&nbsp;"
    } else {
        letter = randomWord.substr(i, 1)
        hiddenWord += "_ "
    }
}

gameHTML = "<h1>Welcome to Hangman!</h1>" +
    "<h2>Try to guess the word: " + hiddenWord + "</h2>" +
    "<h2>Number of guesses remaining: " + guesses + "</h2>" +
    "<h2>Wins: " + wins +
    "<h2>Losses: " + losses +
    "<h2>Guess a letter of the word by pressing a letter on the keyboard.</h2>"

document.getElementById("game").innerHTML = (gameHTML);

document.onkeyup = function(event) {
        letter = String.fromCharCode(event.keyCode).toLowerCase();

        //check to see if the guessed letter was guessed already
        if (guessedLetters.indexOf(letter) < 0) {
            //letter was not guessed yet. continue process
            newLetter = true
        } else {
            //the letter was guessed alredy
            newLetter = false
        }

        //if guessed already, don't add to array and let user know they guessed that letter already
        //don't process the letter any further
        //if not guessed, process letter 

        if (newLetter === true) {

            guessedLetters.push(letter)

            //check is letter guessed was a hit or miss
            //if miss, subtract one from guesses

            hits = 0;
            spaces = 0;
            hiddenWord = "";
            //Check to see if letters guessed match within the random word
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

            if (randomWord.indexOf(letter) >= 0) {
                //the letter pushed is part of the random word
                message = "Good Job! You found a letter!"
            } else {
                message = "Ooops! Try Again!"
                guesses--
            }

            if ((hits + spaces) === randomWord.length) {
                wins++
                message = "Congrats! You Won!!! Now try a new word!"
                gameover = true

                //reset the game with a new word
                //start over
            } else if (guesses === 0) {
                //LOSER
                message = "You suck! Better luck next time. Try Again!"
                gameover = true
            }

        } //end if of new letter
        else { // we do not have a new letter
            message = "You tried that letter already!"

        } // end of new letter process

        if (gameover) {

        	randomWord = ""
        	hiddenWord = ""
        	guessedLetters = []
        	gameover = false
        	guesses = 8

            randomWord = words[Math.floor(Math.random() * words.length)];

            for (var i = 0; i < randomWord.length; i++) {

                if (randomWord.substr(i, 1) === " ") {
                    letter = randomWord.substr(i, 1)
                    hiddenWord += "&nbsp;&nbsp;"
                } else {
                    letter = randomWord.substr(i, 1)
                    hiddenWord += "_ "
                }
            }
        }

        gameHTML = "<h1>Hangman!</h1>" +
            "<h2>" + message + "</h2>" +
            "<h2>word: " + hiddenWord + "</h2>" +
            "<h2>Guessed letters: " + guessedLetters.toString() +
            "<h2>Number of guesses remaining: " + guesses + "</h2>" +
            "<h2>Wins: " + wins +
            "<h2>Losses: " + losses +
            "<h2>Guess a letter of the word by pressing a letter on the keyboard.</h2>"

        document.getElementById("game").innerHTML = (gameHTML);

    } //End of onkeyup event
