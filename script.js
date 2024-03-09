(function () {
  const ticTacToe = {
    gameboard: [],
    score: {
      player1: 0,
      player2: 0,
    },
    player1: {
      name: 'Player 1',
      token: 'O',
      turn: true,
    },
    player2: {
      name: 'Player 2',
      token: 'X',
      turn: false,
    },
    init: function () {
      this.cacheDom();
      this.newRound();
      this.bindEvents();
      this._setScore();
      this.render();
    },
    cacheDom: function () {
      this.scoreContainer = document.querySelector('.scoreContainer');
      this.pScoreContainer = document.querySelector('.pScoresContainer');
      this.gameContainer = document.querySelector('.gameboard');
      this.gameCells = document.querySelectorAll('.cell');
    },
    render: function () {
      this.gameboard.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
          const cellElement = this.gameCells[rowIndex * 3 + cellIndex];
          cellElement.textContent = cell === 0 ? '' : cell;
        });
        this.scoreContainer.textContent = `Score: ${this.score.player1} - ${this.score.player2}`;
        this.pScoreContainer.textContent = `Player 1: ${this.score.player1}, Player 2: ${this.score.player2}`;
      });

      // Update score containers
      this.scoreContainer.textContent = `Score: ${this.score.player1} - ${this.score.player2}`;
      this.pScoreContainer.textContent = `Player 1: ${this.score.player1}, Player 2: ${this.score.player2}`;
    },
    bindEvents: function () {
      this.gameCells.forEach((slot) => {
        slot.addEventListener('click', (e) => {
          this._game(e);
        });
      });
    },
    newRound: function () {
      for (let i = 0; i < 3; i++) {
        this.gameboard[i] = [];
        for (let j = 0; j < 3; j++) {
          this.gameboard[i].push(0);
        }
      }
    },
    playersTurn: function () {
      const currentPlayer = this.player1.turn ? this.player1 : this.player2;
      currentPlayer.turn = !currentPlayer.turn;
      const otherPlayer =
        currentPlayer === this.player1 ? this.player2 : this.player1;
      otherPlayer.turn = !otherPlayer.turn;
      return currentPlayer;
    },

    getScore: function () {
      const result = {
        player1: this.score.player1,
        player2: this.score.player2,
      };
      return result;
    },
    checkScore: function () {
      if (this.score.player1 >= 3) {
        const winner = this.player1.name;
        this._resetScore();
        return winner;
      } else if (this.score.player2 >= 3) {
        const winner = this.player2.name;
        this._resetScore();
        return winner;
      }
    },
    _setScore: function () {
      if (this._checkForWin(this.gameboard) === this.player1.token) {
        this.score.player1++;
        this.newRound();
      } else if (this._checkForWin(this.gameboard) === this.player2.token) {
        this.score.player2++;
        this.newRound();
      }
      this.checkScore();
    },
    _resetScore: function () {
      this.score.player1 = 0;
      this.score.player2 = 0;
      this.newRound();
    },
    _checkForWin: function (board) {
      // Check rows
      for (let i = 0; i < 3; i++) {
        if (
          board[i][0] &&
          board[i][0] === board[i][1] &&
          board[i][0] === board[i][2]
        ) {
          return board[i][0];
        }
      }

      // Check columns
      for (let i = 0; i < 3; i++) {
        if (
          board[0][i] &&
          board[0][i] === board[1][i] &&
          board[0][i] === board[2][i]
        ) {
          return board[0][i];
        }
      }

      // Check diagonals
      if (
        board[0][0] &&
        board[0][0] === board[1][1] &&
        board[0][0] === board[2][2]
      ) {
        return board[0][0];
      }
      if (
        board[0][2] &&
        board[0][2] === board[1][1] &&
        board[0][2] === board[2][0]
      ) {
        return board[0][2];
      }

      // Check for a draw
      let isDraw = true;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          if (board[i][j] === 0) {
            isDraw = false;
            break;
          }
        }
        if (!isDraw) break;
      }

      if (isDraw) {
        // If the board is full and no winner, it's a draw. Reset the game.
        this.newRound();
        return 'draw'; // Return 'draw' to indicate a draw condition
      }

      return null; // No win condition met
    },

    dropToken: function (id) {
      let row;
      let column;
      switch (parseInt(id)) {
        case 1:
          row = 0;
          column = 0;
          break;
        case 2:
          row = 0;
          column = 1;
          break;
        case 3:
          row = 0;
          column = 2;
          break;
        case 4:
          row = 1;
          column = 0;
          break;
        case 5:
          row = 1;
          column = 1;
          break;
        case 6:
          row = 1;
          column = 2;
          break;
        case 7:
          row = 2;
          column = 0;
          break;
        case 8:
          row = 2;
          column = 1;
          break;
        case 9:
          row = 2;
          column = 2;
      }
      if (this.gameboard[row][column] === 0) {
        const player = this.playersTurn();
        this.gameboard[row][column] = player.token;
      }
      this._setScore();
    },
    _game: function (e) {
      this.dropToken(e.target.id);
      this.render();
    },
  };
  ticTacToe.init();
})();
