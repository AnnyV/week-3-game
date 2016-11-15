
// 1. get a ramdom word
// 2. draw a blank line for each later in the word.
// 3. Start guessing latter.
// 4. fill the latter in the blanks if the player guess correctly.
// 5. Draw part of the "hangman" when the player guess wrong. (8 guesses).
// 6. the palyer win when they guess the carrect word
// 7. when the game ends, start over with a new word.

var wins =0;
var losses = 0;
var guesses = 8;
var hits = 0;
var spaces = 0;
var guessedLetters = [];
var words = ["scooby doo", "tom and jerry", "thundercats", "voltron", "transformers", "mighty mouse", 
			"ren and stimpy", "donald duck", "animaniacs", "beetlejuice", "garfield", "inspector gadget", 
			"smurfs", "gummi bears", "johnny quest", "the justice league", "batman", "super man", "south park", 
			"looney tunes", "the jetsons", "the bugs bunny show", "the flinstones", "jem", "dragon ball z"]

var randomWord = " ";

var hiddenWord = "";
var message = " ";
var letter = " ";

randomWord = words[Math.floor(Math.random() * words.length)];

for (var i =0; i < randomWord.length; i++) {

	if (randomWord.substr(i,1) === " ") {
		letter = randomWord.substr(i,1)
		hiddenWord += "  "
	}
	else {
		letter = randomWord.substr(i,1)
		hiddenWord += "_ "
	}
}

message = "<h1>Welcome to Hangman!</h1>" +
			"<h2>Try to guess the word: " + hiddenWord + "</h2>" +
			"<h2>Number of guesses remaining: " + guesses + "</h2>" +
			"<h2>Wins: " + wins +
			"<h2>Losses: " + losses +
			"<h2>Guess a letter of the word by pressing a letter on the keyboard.</h2>"

document.getElementById("game").innerHTML = (message); 

document.onkeyup = function(event) {

	letter = String.fromCharCode(event.keyCode).toLowerCase();

	//check to see if the guessed letter was guessed already
		//if guessed already, don't add to array and let user know they guessed that letter already
			//don't process the letter any further
		//if not guessed, process letter 


	guessedLetters.push(letter)

	//check is letter guessed was a hit or miss
	//if miss, subtract one from guesses

	hits = 0;
	spaces = 0;
	hiddenWord = "";
	//Check to see if letters guessed match within the random word
	for (var i =0; i < randomWord.length; i++) {

	if (randomWord.substr(i,1) === " ") {
		//spaces are ignored
		hiddenWord += "  "
		spaces++
	} //end-if space check
	else if (guessedLetters.indexOf(randomWord.substr(i,1)) >= 0) {
		//Character of random word matches a guessed letter
		hiddenWord += randomWord.substr(i,1) + " "
		hits++
	}//end if of letter match
	else {
	//guessed letter doesn't match the character in random word
		hiddenWord += "_ "
	}

	}//end for loop

	if ((hits + spaces) === randomWord.length) {
		wins++
		//reset the game with a new word
		//start over
	}

message = "<h1>Welcome to Hangman!</h1>" +
			"<h2>Try to guess the word: " + hiddenWord + "</h2>" +
			"<h2>Guessed letters: " + guessedLetters.toString() +
			"<h2>Number of guesses remaining: " + guesses + "</h2>" +
			"<h2>Wins: " + wins +
			"<h2>Losses: " + losses +
			"<h2>Guess a letter of the word by pressing a letter on the keyboard.</h2>"

document.getElementById("game").innerHTML = (message); 

}//End of onkeyup event
