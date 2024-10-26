"use strict";
// ^ select element
const scoreEL0 = document.getElementById("score--0");
const scoreEL1 = document.getElementById("score--1");
const diceEL = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
const currentEL0 = document.getElementById("current--0");
const currentEL1 = document.getElementById("current--1");
const playerEL0 = document.querySelector(`.player--0`);
const playerEL1 = document.querySelector(`.player--1`);
let scores, curentScore, activePlayer, playing;
// ^ start condition
scoreEL0.textContent = 0;
scoreEL1.textContent = 0;
diceEL.classList.add("hidden");

// ^ Rolling dice functionality
const initGame = function () {
  scores = [0, 0];
  curentScore = 0;
  activePlayer = 0;
  playing = true;
  scoreEL0.textContent = 0;
  scoreEL1.textContent = 0;
  currentEL0.textContent = 0;
  currentEL1.textContent = 0;
  diceEL.classList.add("hidden");
  playerEL0.classList.remove("player--winner");
  playerEL1.classList.remove("player--winner");
  playerEL0.classList.add("player--active");
  playerEL1.classList.remove("player--active");
  document.getElementById(`winner--0`).textContent = "";
  document.getElementById(`winner--1`).textContent = "";
};
initGame();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  curentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  playerEL0.classList.toggle("player--active");
  playerEL1.classList.toggle("player--active");
};
btnRoll.addEventListener("click", function () {
  if (playing) {
    // ^ Generete Random dice
    const dice = Math.trunc(Math.random() * 6) + 1;

    // ^ Display dice
    diceEL.classList.remove("hidden");
    diceEL.src = `dice-${dice}.png`;
    // ^ check for rolled 1
    if (dice !== 1) {
      //^ switch to next player
      curentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        curentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // ^ add current score to active player
    scores[activePlayer] += curentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    curentScore = 0;
    //^ check if score >=100
    //^ end game
    if (scores[activePlayer] >= 20) {
      playing = false;
      diceEL.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      document.getElementById(`winner--${activePlayer}`).textContent =
        "🎉winner";
    } else {
      //^ switch player
      switchPlayer();
    }
  }
});
btnNew.addEventListener("click", function () {
  initGame();
});
