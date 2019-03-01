//convert answer to array, then compare answerArr.length() with playerHits.length()
// allow player hits to stroe more than 1 letter in necassary ex: baby - 2 b;

//Creates object game
var game = {
    //Store player inputs into an array
    //This is the array that will print under Guesses in html index31
    playerInputs: [],

    //Store player correct inputs
    playerHits: [],

    //Store answer variable
    answer: [""],

    //Used to store the amount of _ needed for word
    answerLength: [],

    //Create word bank for guessable words
    wordBank: ["Thundaga", "Blizzard", "Fira", "Gravira", "Curaga", "Areo", "Stopra"],

    isWon: false,


    //Getter for answer
    getAnswer: function () {
        return this.answer;
    },

    //This method gets userinput and stores it in var input
    getPlayerChoice: function () {

        document.onkeyup = function (event) {
            var input = event.key.toLowerCase();

            //Checks to see if player already guessed letter
            if (game.playerInputs.includes(input)) {
                console.log("You already guessed that");
                return;
            }
            game.playerInputs.push(input);

            game.checkPlayerChoice(input);
        }

    },

    //This method generates the answer
    generateAnswer: function () {
        var answer = game.wordBank[Math.floor(Math.random() * game.wordBank.length)];
        game.answer = answer.toLowerCase();

        for ( var i = 0; i < answer.length; i++) {
            game.answerLength.push("_");
        }
    },

    //This method checks to see if the player input is included in the answer
    checkPlayerChoice: function (input) {

        //Checks to see if input is in our answer
        if (game.answer.toLowerCase().includes(input)) {

            for (var i = 0; i < game.answer.length; i++) {
                if (game.answer[i] === input) {
                    game.playerHits.push(input)
                    game.answerLength[i] = input;
                }
            }
            console.log(game.answerLength)
            console.log("playerhits: " + game.playerHits);

            if (game.playerHits.length === game.answer.length) {
                game.isWon = true;
                console.log("you win");
            }
        } else {
            console.log("nope");
        }
        console.log(game.playerInputs);
    }
}


game.generateAnswer();
console.log(game.answerLength);
do {
    game.getPlayerChoice();
} while (game.isWon);
