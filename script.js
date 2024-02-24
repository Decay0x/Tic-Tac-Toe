const Gameboard = (function () {
  const gameboard = [];
  const score = {
    scorePlayer1: 0,
    scorePlayer2: 0,
  };
  const player1 = {
    name: 'Player 1',
    token: 1,
    turn: true,
    getToken: function () {
      return this.token;
    },
  };
  const player2 = {
    name: 'Player 2',
    token: 2,
    turn: false,
    getToken: function () {
      return this.token;
    },
  };
  const rows = 3;
  const columns = 3;

  const newRound = function () {
    for (let i = 0; i < rows; i++) {
      gameboard[i] = [];
      for (let j = 0; j < columns; j++) {
        gameboard[i].push(0);
      }
    }
    if (score.scorePlayer1 >= 3 || score.scorePlayer2 >= 3) {
      score.scorePlayer1 = 0;
      score.scorePlayer2 = 0;
    }
  };
  newRound();

  const getScore = () => {
    const result = `Player 1: ${score.scorePlayer1} Player 2: ${score.scorePlayer2}`;
    return result;
  };
  const _setScore = () => {
    // Check rows
    for (let i = 0; i < rows; i++) {
      if (
        gameboard[i][0] === gameboard[i][1] &&
        gameboard[i][1] === gameboard[i][2] &&
        gameboard[i][0] !== 0
      ) {
        if (gameboard[i][0] === player1.token) {
          score.scorePlayer1++;
          if (score.scorePlayer1 >= 3) {
            const winner = player1.name;
            newRound();
            return winner;
          }
          newRound();
        } else if (gameboard[i][0] === player2.token) {
          score.scorePlayer2++;
          if (score.scorePlayer2 >= 3) {
            const winner = player2.name;
            newRound();
            return winner;
          }
          newRound();
        }
        return getScore();
      }
    }

    // Check columns
    for (let i = 0; i < columns; i++) {
      if (
        gameboard[0][i] === gameboard[1][i] &&
        gameboard[1][i] === gameboard[2][i] &&
        gameboard[0][i] !== 0
      ) {
        if (gameboard[0][i] === player1.token) {
          score.scorePlayer1++;
        } else if (gameboard[0][i] === player2.token) {
          score.scorePlayer2++;
        }
        return getScore();
      }
    }

    // Check diagonals
    if (
      gameboard[0][0] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][2] &&
      gameboard[0][0] !== 0
    ) {
      if (gameboard[0][0] === player1.token) {
        score.scorePlayer1++;
      } else if (gameboard[0][0] === player2.token) {
        score.scorePlayer2++;
      }
      return getScore();
    }
    if (
      gameboard[0][2] === gameboard[1][1] &&
      gameboard[1][1] === gameboard[2][0] &&
      gameboard[0][2] !== 0
    ) {
      if (gameboard[0][2] === player1.token) {
        score.scorePlayer1++;
      } else if (gameboard[0][2] === player2.token) {
        score.scorePlayer2++;
      }
      return getScore();
    }

    return false;
  };

  const playerTurn = () => {
    if (player1.turn === true) {
      player1.turn = !player1.turn;
      player2.turn = !player2.turn;
      return player1;
    } else {
      player1.turn = !player1.turn;
      player2.turn = !player2.turn;
      return player2;
    }
  };
  const dropToken = (row, column) => {
    if (gameboard[row][column] === 0) {
      const player = playerTurn();
      gameboard[row].splice(column, 1, player.getToken());
    } else {
      console.log('pick another spot');
    }
    console.log(_setScore());
  };
  return {
    getScore: getScore,
    dropToken: dropToken,
  };
})();
