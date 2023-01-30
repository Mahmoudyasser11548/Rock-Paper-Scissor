const GameChoices = ["Paper", "Scissors", "Rock",];


let ruleModal = document.querySelector('.rules');
ruleBtn = document.querySelector('.rules-btn');
closeBtn = document.querySelector('.close-btn');
overlayRule = document.querySelector('.overlay');
scoreCount = document.querySelector('.score-count');
gameContent = document.querySelector('.game-content');
gameChoice = document.querySelectorAll('.game-choice');
gameChoiceImage = document.querySelector('.computer-choice');
gameChoiceComputer = document.querySelector('.game-computer');
countDownDiv = document.querySelector('.count');
gameResult = document.querySelector('.game-result');
gameResultTitle = document.querySelector('.result-title');
playAgainBtn = document.querySelector('.play-again');
computerChoice = document.querySelector('.computer-choice');
randomResult = '';
countDown = 4;


const RulesModal = () => ruleModal.classList.toggle('active');

const GetChoiceRandom = () => Math.floor(Math.random() * GameChoices.length);

const gameChoiceCondition = (userChoice, computerChoice) => {
  let score = parseInt(scoreCount.textContent);

  if(userChoice === computerChoice) {
    gameResultTitle.textContent = 'Draw';
  } else if(
    (userChoice === GameChoices[0] && computerChoice === GameChoices[1]) ||
    (userChoice === GameChoices[1] && computerChoice === GameChoices[2]) ||
    (userChoice === GameChoices[2] && computerChoice === GameChoices[0])
  ) {
    gameResultTitle.textContent = 'You Lose';
    gameContent.classList.add("isResult", "isLost");

    if(score > 0) {
      scoreCount.textContent = score - 1;
    }
  } else {
    gameResultTitle.textContent = 'You Win';
    scoreCount.textContent = score + 1;
  }
};

const CountDown = () => {
  countDownDiv.textContent = countDown - 1;
  countDown -= 1;

  if(countDown) {
    setTimeout(() => CountDown(), 700);
  } else {
    chooseShape();

    setTimeout(() => gameContent.classList.add('isResult'), 500);
    countDownDiv.textContent = '';

    addImage();
    countDown = 4;

  }
};

const chooseShape = () => {
  let userChoiceGame = document.querySelector('.game-choice.active');
  let userChoiceShape = userChoiceGame.dataset.choice;
  randomResult = GameChoices[GetChoiceRandom()];

  gameChoiceCondition(userChoiceShape, randomResult);
};

const addImage = () => {
  gameChoiceComputer.classList.add(`game-${randomResult.toLowerCase()}`);
  gameChoiceImage.setAttribute('src', `./imgs/icon-${randomResult.toLowerCase()}.svg`);
};

const startGame = (event) => {
  gameContent.classList.add('active');
  event.target.classList.add('active');

  CountDown();
};

const playAgain = () => {
  const gameChoiceActive = document.querySelector(".game-choice.active");
  gameChoiceComputer.classList.remove(`game-${randomResult.toLowerCase()}`);
  gameChoiceImage.setAttribute('src', '');
  gameContent.classList.remove('active', 'isResult', 'isLost');
  gameChoiceActive.classList.remove('active');
};

// Event Listner
gameChoice.forEach((choice) => choice.addEventListener('click', (e) => startGame(e)));
playAgainBtn.addEventListener('click', playAgain);


// Rules Event
ruleBtn.addEventListener('click', RulesModal);
closeBtn.addEventListener('click', RulesModal);
overlayRule.addEventListener('click', RulesModal);

