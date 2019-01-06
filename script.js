const drawOrder = [hangmanBody.drawHead, hangmanBody.drawTorso, hangmanBody.drawLeftArm, hangmanBody.drawRightArm, hangmanBody.drawLeftLeg, hangmanBody.drawRightLeg];
const words = ['Zebra', 'Dog', 'Horse', 'Elephant', 'Cat', 'Mouse', 'Duck', 'Beaver', 'Bird', 'Fox', 'Wolf'];
const endBanner = document.querySelector('.result-banner');
const endMessageContainer = document.querySelector('.result-message');
const wordContainer = document.querySelector('.words-container');
const mistakeCounter = document.querySelector('#mistakeCounter');
const wordPlaceholderSign = "_";

let activeWord = '';
let activeLetters = '';
let lettersFound = 0;
let hangmanProgress = -1;
let chancesLeft = 6;
let drawingInProgress = false;

showChances();
drawGallows();

function getNewLetters() {
  getNewWord(words).forEach((letter, index) => {
    let letterContainer = document.createElement("SPAN");

    letterContainer.innerHTML = wordPlaceholderSign;
    letterContainer.setAttribute("data-letter-index", index);
    letterContainer.classList.add('letter-holder')

    wordContainer.appendChild(letterContainer);
  });
};

document.addEventListener('keypress', function(event) {
  letterPlayed(event.key);
});

function letterPlayed(letterPlayed) {
  markKey(letterPlayed.toUpperCase());
  let mistakeMade = true;
  activeLetters.forEach((letter, index) => {
    if (letter.toUpperCase() === letterPlayed.toUpperCase()) {
      const letterDisplayed = document.querySelector(`[data-letter-index="${index}"]`);
      if(letterDisplayed.innerHTML != letterPlayed) {
        if(index === 0) {
          document.querySelector(`[data-letter-index="${index}"]`).innerHTML = letterPlayed.toUpperCase();
        } else {
          document.querySelector(`[data-letter-index="${index}"]`).innerHTML = letterPlayed.toLowerCase();
        }
        lettersFound++;
      }
      mistakeMade = false;
    }
  });
  if (mistakeMade) {
    drawFigure();
    updateChances();
    return
  };
  checkForWin();
}


document.querySelector('.restart-button').addEventListener('click', function() {
  resetGame();
});

document.querySelector('.keyboard-toogle').addEventListener('click', function() {
  document.querySelector('.keyboard-wrapper').classList.toggle('active-keyboard');
});

document.querySelectorAll('span.key').forEach(element => {
  element.addEventListener('click', (e) => {
    letterPlayed(e.target.innerHTML);
  });
});

getNewLetters();