function getNewWord(array) {
  let randomIndex = Math.floor(Math.random() * (array.length));
  activeWord = array[randomIndex];
  activeLetters = activeWord.split("");
  return activeLetters;
};

function showChances() {
  mistakeCounter.innerHTML = chancesLeft;
}
function updateChances() {
  chancesLeft --;
  showChances();
}

function drawFigure() {
  hangmanProgress++;
  drawOrder[hangmanProgress]();

  if (hangmanProgress === drawOrder.length - 1) {
    gameEnd('lost');
  }
}

function checkForWin() {
  if (lettersFound === activeLetters.length) {
    gameEnd('won');
  }
}

function resetGame() {
  if (!drawingInProgress) {
    endBanner.classList.remove('active');
    hangmanProgress = -1;
    clearFigure();
    chancesLeft = 6;
    showChances();
    lettersFound = 0;
    while (wordContainer.firstChild) {
      wordContainer.removeChild(wordContainer.firstChild);
    }
    getNewLetters();
  } else {
    setTimeout(() => {
      resetGame();
    }, 500)
  }
}

function gameEnd(result) {
  endBanner.classList.add('active');
  if (result === 'won') {
    endMessageContainer.innerHTML = "Congrats! Have another go at it?";
  } else { 
    hangmanBody.killHangman();
    endMessageContainer.innerHTML = `The word was ${activeWord}! You'll get it next time though!`;
  }
}