//convert answer to array, then compare answerArr.length() with playerHits.length()
// allow player hits to stroe more than 1 letter in necassary ex: baby - 2 b;

//Creates object game
var game = {
    //Store player inputs into an array
    //This is the array that will print under Guesses in html index31
    playerInputs: [],

    //Store player correct inputs
    playerHits: [],

    //Store Player remaining tries
    playerLives: "8",

    //Stor Counter
    counter: 0,

    //Store answer variable
    answer: [""],

    //Used to store the amount of _ needed for word
    answerLength: [],
    //AnswerLength as String
    sAnswerLength: "",

    //Create word bank for guessable words
    wordBank: ["Thundaga", "Blizzard", "Fira", "Gravira", "Curaga", "Aero", "Stopra", "lavalash", "dispell", "comet", "abrakadabra", "shock", "deathcoil", "haste"],

    //Create boolean to see if player won game.
    isWon: false,

    //Create win/loss counter
    winCounter: "0",
    lossCounter: "0",

    //give target vars for html elements
    targetGuesses: document.getElementById("guesses"),
    targetAnswerLength: document.getElementById("answer-length"),
    targetPlayerLives : document.getElementById("player-lives"),
    targetLossCounter: document.getElementById("loss-counter"),
    targetWinCounter: document.getElementById("win-counter"),

    //Getter for answer
    getAnswer: function () {
        return this.answer;
    },

    //This method gets userinput and stores it in var input
    getPlayerChoice: function () {
        game.playerInputs = [];
        game.playerHits = [];

        document.onkeyup = function (event) {
            var input = event.key.toLowerCase();

            //Checks to see if player already guessed letter
            if (game.playerInputs.includes(input)) {
                alert("You already guessed that");
                return;
            }
            game.playerInputs.push(input);

            game.checkPlayerChoice(input);
            // console.log(game.playerLives);

            // console.log(game.playerInputs);
        game.targetPlayerLives.textContent = game.playerLives;
        game.targetGuesses.textContent = game.playerInputs.join(" ");
        }
    },

    //This method generates the answer
    generateAnswer: function () {
        game.answerLength = [];

        var answer = game.wordBank[Math.floor(Math.random() * game.wordBank.length)];
        game.answer = answer.toLowerCase();

        for (var i = 0; i < answer.length; i++) {
            game.answerLength.push("_");
        }

        game.sAnswerLength = game.answerLength.join(" ");

        var targetAnswer = document.getElementById("answer-length");
        targetAnswer.textContent = game.sAnswerLength;
    },

    //This method checks to see if the player input is included in the answer
    checkPlayerChoice: function (input) {

        //Addes to counter for guessing
        game.counter++;

        //Checks to see if input is in our answer
        if (game.answer.toLowerCase().includes(input)) {

            for (var i = 0; i < game.answer.length; i++) {
                if (game.answer[i] === input) {
                    game.playerHits.push(input)
                    game.answerLength[i] = input;
                }
            }

            game.sAnswerLength = game.answerLength.join(" ");

            game.targetAnswerLength.textContent = game.sAnswerLength;
            // console.log(game.sAnswerLength);
            // console.log("playerhits: " + game.playerHits);

            if (game.playerHits.length === game.answer.length) {
                game.isWon = true;
                alert("You learned the spell!, try your luck at another.");
                game.winCounter++;
                game.targetWinCounter.textContent = game.winCounter;
                game.restartValues();
            }
        } else {
            game.playerLives--;
            console.log(game.atemptsRemaining)
            // console.log(game.sAnswerLength);
            // console.log(game.answerLength);
            if (game.playerLives <= 0) {
                alert("Yikes, let us try another spell");
                game.lossCounter++;
                game.targetLossCounter.textContent = game.lossCounter;
                game.targetAnswerLength.textContent = game.answer;
                game.restartValues();
            }
        }

        // console.log(game.playerLives);
        // game.targetPlayerLives.textContent = game.playerLives;
    },

    restartValues: function () {
        var guessingDiv = document.getElementById("guesses");
        guessingDiv.textContent = "";
        game.playerInputs = [];
        game.playerHits = [];
        game.answer = [""];
        game.answerLength = [];
        game.isWon = false;
        game.playerLives = "8";

    },

    generateSpell: function () {
        document.getElementById("generate-spell").addEventListener("click", function () {
            game.restartValues();
            game.generateAnswer();
            console.log(game.sAnswerLength);
        });
    }
}

//Generates new spell when the button is clicked
game.generateSpell();

if (!game.isWon && game.playerLives >= 0) {
    game.getPlayerChoice();
} else {

}

