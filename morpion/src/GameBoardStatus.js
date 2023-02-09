import React, { Component } from "react";

class GameBoardStatus extends Component {
    render() {
        switch (this.props.status) {
            case -1:
                return (
                    <div id="gameBoardStatus">
                        <p>Partie en cours !</p>
                        <p>Joueur actuel : Joueur n°{this.props.currentplayer + 1}</p>
                    </div>
                );

            case 0:
                return (
                    <div id="gameBoardStatus">
                        <p>Fin de partie : Match nul!</p>
                    </div>
                );
            case 1:
                return (
                    <div id="gameBoardStatus">
                        <p>{this.props.winType}</p>
                        <p>Gagnant : Joueur n°{this.props.loser + 1}</p>
                        <p>Perdant : Joueur n°{this.props.winner + 1}</p>
                    </div>
                );
            default:
                return null;
        }
    }
}

export default GameBoardStatus;
