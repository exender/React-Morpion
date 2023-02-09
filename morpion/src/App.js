import React, { Component } from "react";
import "./App.css";
import GameTableBoard from "./GameTableBoard";
import GameBoardStatus from "./GameBoardStatus";
import ManagmentButtons from "./ManagementButtons";
import PlayerStatus from "./playerScoresStatus";
import Title from "./Components/Title";

class App extends Component {
  /**
   * Constructeur de classe
   */
  constructor() {
    super();
    this.state = {
      currentPlayer: 0,
      gameBoard: [["", "", ""], ["", "", ""], ["", "", ""]],
      gamestatus: -1,
      winner: 2,
      loser: 2,
      isFinished: false,
      lastMove: [0, 0],
      winMessage: "",
      playerGameStatus: [
        { win: 0, lost: 0, draws: 0 },
        { win: 0, lost: 0, draws: 0 }
      ]
    };
  }

  /**
   * Handle click event for the game play
   */
  handleClickEvent = (x, y) => {
    let currentGameStatus = this.state.gamestatus;
    if (this.state.gameBoard[x][y] != "") {
      alert("Veuillez remplir une case vide!");
    } else {
      if (currentGameStatus === -1) {
        let newGameBoard = this.cloneGameBoard(this.state.gameBoard);
        let updatedCurrentPlayer = this.state.currentPlayer;

        if (this.state.currentPlayer === 0) {
          newGameBoard[x][y] = "X";
        } else if (this.state.currentPlayer === 1) {
          newGameBoard[x][y] = "O";
        } else {
          newGameBoard[x][y] = "";
        }

        if (updatedCurrentPlayer === 0) {
          updatedCurrentPlayer = 1;
        } else {
          updatedCurrentPlayer = 0;
        }
        let newLastMove = [x, y];

        this.setState(
          {
            gameBoard: newGameBoard,
            currentPlayer: updatedCurrentPlayer,
            lastMove: newLastMove
          },
          () => {
            let currentGameStatus = this.checkForWinner();

            this.setState({
              gamestatus: currentGameStatus
            });
          }
        );
      } else {
        alert("Vous ne pouvez pas jouer : la partie est finie!");
      }
    }
  };

  /**
   * Cloning table
   * @param {le tableau à recopier} refTable
   */
  cloneGameBoard(refTable) {
    let newTable = [];
    for (let i = 0; i < 3; i++) {
      newTable[i] = [];
      for (let j = 0; j < 3; j++) {
        newTable[i][j] = refTable[i][j];
      }
    }
    return newTable;
  }

  /**
   * Cancel the last move, returning to the previous state of the game
   */
  cancelLastMove = () => {
    if (this.isGameTableEmpty() === true) {
      alert("Vous ne pouvez pas : la partie n'a pas commencée!");
    } else {
      let newGameBoard = this.cloneGameBoard(this.state.gameBoard);
      newGameBoard[this.state.lastMove[0]][this.state.lastMove[1]] = "";
      this.setState({
        gameBoard: newGameBoard
      });
    }
  };

  /**
   * Check if the table is empty
   */
  isGameTableEmpty() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.state.gameBoard[i][j] !== "") {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Update the win message message for the tictactoe
   * @param message victory type
   * @param id column/line id
   */
  updateWinMessage(message, id) {
    var newWinMessage = "";
    switch (message) {
      case "line":
        newWinMessage = "Fin de partie : Victoire avec la ligne n°" + id + ".";
        break;

      case "column":
        newWinMessage =
          "Fin de partie : Victoire avec la colonne n°" + id + ".";
        break;

      case "diagonale":
        newWinMessage = "Fin de partie : Victoire avec la diagonale.";
        break;

      case "reversediagonale":
        newWinMessage = "Fin de partie : Victoire avec la diagonale inversée.";
        break;

      default:
        newWinMessage = "Erreur";
        break;
    }
    console.log(this.state.currentPlayer);
    var looserPlayer = (this.state.currentPlayer + 1) % 2;
    var winnerPlayer = 0;

    this.setState({
      gamestatus: 1,
      isFinished: true,
      winMessage: newWinMessage,
      loser: looserPlayer,
      winner: winnerPlayer
    });
    this.updateStatus(this.state.gamestatus);
  }

  /**
   * Update the message
   */
  updateDrawMessage() {
    this.setState({
      gamestatus: 0,
      isFinished: true
    });
  }

  /**
   * Create an empty table for the player
   */
  cloningPlayerStatus() {
    var newPlayerGameStatus = [];
    this.state.playerGameStatus.forEach(function (element, index) {
      newPlayerGameStatus[index] = [];
      newPlayerGameStatus[index].win = element.win;
      newPlayerGameStatus[index].draws = element.draws;
      newPlayerGameStatus[index].lost = element.lost;
      console.log(newPlayerGameStatus[index]);
    });
    return newPlayerGameStatus;
  }

  /**
   * Update the array of the player past game status
   * @param status status of the table
   */
  updateGameStatusTable(status) {
    var newPlayerGameStatus = this.cloningPlayerStatus();
    console.log("Table des joueurs : " + newPlayerGameStatus);
    switch (status) {
      case "victorious":
        newPlayerGameStatus[(this.state.currentPlayer + 1) % 2]["win"] =
          newPlayerGameStatus[(this.state.currentPlayer + 1) % 2]["win"] + 1;
        newPlayerGameStatus[this.state.currentPlayer]["lost"] =
          newPlayerGameStatus[this.state.currentPlayer]["lost"] + 1;
        break;

      case "draw":
        newPlayerGameStatus[this.state.currentPlayer].draws =
          newPlayerGameStatus[this.state.currentPlayer].draws + 1;
        newPlayerGameStatus[(this.state.currentPlayer + 1) % 2]["draws"] =
          newPlayerGameStatus[(this.state.currentPlayer + 1) % 2]["draws"] + 1;
        break;

      default:
        break;
    }
    this.setState({
      playerGameStatus: newPlayerGameStatus
    });
  }

  /**
   * Fonction de recherche du gagnant
   */
  checkForWinner() {
    const newGameTableBoard = this.cloneGameBoard(this.state.gameBoard);

    for (let i = 0; i < 3; i++) {
      let gameLine = newGameTableBoard[i];
      if (
        (gameLine[0] === gameLine[1] &&
          gameLine[0] === gameLine[2] &&
          gameLine[0] === "O") ||
        (gameLine[0] === gameLine[1] &&
          gameLine[0] === gameLine[2] &&
          gameLine[0] === "X")
      ) {
        console.log("Victoire par la ligne " + i);
        this.updateGameStatusTable("victorious");
        this.updateWinMessage("line", i);
        return 1;
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        (newGameTableBoard[0][i] === newGameTableBoard[1][i] &&
          newGameTableBoard[0][i] === newGameTableBoard[2][i] &&
          newGameTableBoard[0][i] === "X") ||
        (newGameTableBoard[0][i] === newGameTableBoard[1][i] &&
          newGameTableBoard[0][i] === newGameTableBoard[2][i] &&
          newGameTableBoard[0][i] === "O")
      ) {
        this.updateGameStatusTable("victorious");
        this.updateWinMessage("column", i);
        console.log("Victoire par la colonne " + i);
        return 1;
      }
    }
    if (
      (newGameTableBoard[0][0] === newGameTableBoard[1][1] &&
        newGameTableBoard[0][0] === newGameTableBoard[2][2] &&
        newGameTableBoard[0][0] === "X") ||
      (newGameTableBoard[0][0] === newGameTableBoard[1][1] &&
        newGameTableBoard[0][0] === newGameTableBoard[2][2] &&
        newGameTableBoard[0][0] === "O")
    ) {
      this.updateGameStatusTable("victorious");
      this.updateWinMessage("diagonale", 0);
      console.log("Victoire en diagonale");
      return 1;
    } else if (
      (newGameTableBoard[0][2] === newGameTableBoard[1][1] &&
        newGameTableBoard[0][2] === newGameTableBoard[2][0] &&
        newGameTableBoard[0][2] === "X") ||
      (newGameTableBoard[0][2] === newGameTableBoard[1][1] &&
        newGameTableBoard[0][2] === newGameTableBoard[2][0] &&
        newGameTableBoard[0][2] === "O")
    ) {
      this.updateGameStatusTable("victorious");
      this.updateWinMessage("reversediagonale", 0);
      console.log("Victoire en diagonale inversée");
      return 1;
    } else if (this.isGameTableFilled() == true) {
      this.updateGameStatusTable("draw");
      this.updateDrawMessage();
      return 0;
    } else {
      console.log("Suite de la partie");
      return -1;
    }
  }

  /**
   * Vérifie si le tableau est remplit
   * @returns {true} le tableau est remplit, {false} sinon
   */
  isGameTableFilled() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.state.gameBoard[i][j] === "") {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Vérifie le statut du jeu
   * @param {le statut du jeu} gameStatus
   */
  updateStatus(gameStatus) {
    let winnerPlayer;
    let looserPlayer;
    if (gameStatus !== 2) {
      if (this.state.currentPlayer === 0) {
        winnerPlayer = 0;
        looserPlayer = 1;
      } else {
        winnerPlayer = 1;
        looserPlayer = 0;
      }
    }
    let isFinishedGame = true;
    this.setState({
      winner: winnerPlayer,
      looser: looserPlayer,
      isFinished: isFinishedGame
    });
  }

  razScores = e => {
    this.setState({
      playerGameStatus: [
        { win: 0, lost: 0, draws: 0 },
        { win: 0, lost: 0, draws: 0 }
      ]
    });
  };

  /**
   * Resetting board function
   */
  razBoardButtonHandler = e => {
    const newGameStatus = -1;
    this.setState({
      gameBoard: [["", "", ""], ["", "", ""], ["", "", ""]],
      lastMove: [0, 0],
      gamestatus: newGameStatus
    });
  };

  /**
   * Affichage de la classe
   */
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Title name={"Craoutch morpion"} />
          <GameTableBoard
            board={this.state.gameBoard}
            onClick={this.handleClickEvent}
          />
          <GameBoardStatus
            winType={this.state.winMessage}
            status={this.state.gamestatus}
            winner={this.state.winner}
            loser={this.state.loser}
            currentplayer={this.state.currentPlayer}
          />
          <PlayerStatus playerGameStatus={this.state.playerGameStatus} />
          <ManagmentButtons
            razScoresOnClick={this.razBoardButtonHandler}
            razBoardOnClick={this.razBoardButtonHandler}
            cancelLastMove={this.cancelLastMove}
          />
        </header>
      </div>
    );
  }
}

export default App;
