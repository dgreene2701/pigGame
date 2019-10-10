/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gamePlaying, previousRoll, previousRollRight, scoreLimit;
scoreLimit = 100;
init();

document.querySelector('.btn-roll').addEventListener('click', function (){
  if(gamePlaying){
    //1. generate random number
    var dice = Math.floor(Math.random() * 6) + 1;
    var diceRight = Math.floor(Math.random() * 6) + 1;
    //2. display result
    var diceDOM = document.querySelector('.dice');
    var diceRightDOM = document.querySelector('.diceRight');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + ".png";
    diceRightDOM.style.display = 'block';
    diceRightDOM.src = 'dice-' + diceRight + ".png";
    //3. Update the round score IF the random number of NOT a 1
    if (dice !== 1 && diceRight !== 1){
      //check if dice and previousRoll are NOT equal to 6
      if ((previousRoll === 6 || previousRollRight === 6) && (dice === 6 || diceRight === 6)){
        //erase current player's score switch to next players
        scores[activePlayer] = 0;
        document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
        nextPlayer();
      } else {
        //Add the score
        roundScore += (dice + diceRight);
        previousRoll = dice;
        previousRollRight = diceRight;
        document.querySelector('#current-'+ activePlayer).textContent = roundScore;
      };
    } else {
      //Change to next player
      nextPlayer();

    };
  };
});

document.querySelector('.btn-hold').addEventListener('click', function () {
  if(gamePlaying){
    //add current score to player's global scores
    scores[activePlayer] += roundScore;
    //update the UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //check if the player won the game
    if (scores[activePlayer] >= scoreLimit) {
      document. querySelector('#name-' + activePlayer).textContent = "Winner!";
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.diceRight').style.display = 'none';
      document.querySelector('.player-' + activePlayer + "-panel").classList.add('winner')
      document.querySelector('.player-' + activePlayer + "-panel").classList.remove('active')
      document.getElementById('userScoreLimit').value = '';
      gamePlaying = false;
    } else {
      //Change to next player
      nextPlayer();
    }
  };
});

function nextPlayer(){
  //Change to next player
  document.querySelector('.player-' + activePlayer + "-panel").classList.remove('active');
  document.getElementById('current-' + activePlayer).textContent = '0';
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.querySelector('.player-' + activePlayer + "-panel").classList.add('active');
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.diceRight').style.display = 'none';
}

document.querySelector('.btn-new').addEventListener('click', function(){
  scoreLimit = document.getElementById('userScoreLimit').value;
  if(scoreLimit === 'undefined' || isNaN(scoreLimit) || scoreLimit === ''){
    scoreLimit = 100;
  };
  init();
});

function init(){
  console.log(scoreLimit);
  scores = [0,0];
  activePlayer = 0;
  roundScore = 0;
  gamePlaying = true;
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.diceRight').style.display = 'none';
  document.getElementById('score-0').textContent = 0;
  document.getElementById('score-1').textContent = 0;
  document.getElementById('current-0').textContent = 0;
  document.getElementById('current-1').textContent = 0;
  document.querySelector('#name-0').textContent = "Player 1";
  document.querySelector('#name-1').textContent = "Player 2";
  document.querySelector('.player-0-panel').classList.remove('winner')
  document.querySelector('.player-1-panel').classList.remove('winner')
  document.querySelector('.player-' + activePlayer + "-panel").classList.add('active')

}


/*
3 Challenges
1. Player loses their ENTIRE score (not just round score) if they roll 2 6s in a row (save previous dice roll value)
2. Add an input field so players can change the winnning score (hint: use the .value property to read the input)
3. Add a second dice to the game. Player loses their current score if either dice come up as 1.
*/
