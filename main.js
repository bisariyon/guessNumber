let randNum = Math.floor(Math.random() * 100 + 1);

const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
let guesses = document.querySelector(".guesses");
let remaining = document.querySelector(".lastResult");
let lowOrHigh = document.querySelector(".lowOrHi");
let startOver = document.querySelector(".resultParas");

let guessMade = new Array();

let playGame = true;
let noOfGuess = 0;

let p = document.createElement("p");

if (playGame) {
  submit.addEventListener("click", function (event) {
    event.preventDefault();
    let inputValue = parseInt(userInput.value);
    validateGuess(inputValue);
  });
}

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please Enter a Valid Number");
  } else if (guess < 1 || guess > 100) {
    alert("Enter number from given range (1-100)");
  } else {
    guessMade.push(guess);
    if (noOfGuess >= 9) {
      cleanUp(guess);
      displaymessage(`Game Over...Random Number was ${randNum}`);
      endgame();
    } else {
      cleanUp(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === randNum) {
    displaymessage(`You guessed it right`);
    endgame();
  } else if (guess < randNum) {
    displaymessage(`Number is too low`);
  } else {
    displaymessage(`Number is too high`);
  }
}

function cleanUp(guess) {
  userInput.value = "";
  guesses.innerHTML += `${guess} `;
  noOfGuess++;
  remaining.innerHTML = `${10 - noOfGuess}`;
}

function displaymessage(message) {
  lowOrHigh.innerHTML = `<h2>${message}</h2>`;
}

function endgame() {
  playGame = false;
  userInput.value = "";
  userInput.setAttribute("disabled", "");
  p.classList.add("button");
  p.innerHTML = '<h2 id = "newgame" class = "new" >Start New Game</h2>';
  startOver.appendChild(p);
  newGame();
}

function newGame() {
  let newGameButton = document.querySelector("#newgame");
  newGameButton.addEventListener("click", function (event) {
    randNum = Math.floor(Math.random() * 100 + 1);
    guessMade = [];
    noOfGuess = 0;
    guesses.innerHTML = "";
    remaining.innerHTML = 10;
    userInput.removeAttribute("disabled");
    startOver.removeChild(p);
    playGame = true;
    lowOrHigh.textContent = "";
  });
}
