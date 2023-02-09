import React, { Component } from "react";
class PlayerStatus extends Component {
    render() {
        return (
            <table border="1px">
                <tr>
                    <td colspan="6">Table des joueurs</td>
                </tr>
                <tr>
                    <td colspan="3">Joueur n°1</td>
                    <td colspan="3">Joueur n°2</td>
                </tr>
                <tr>
                    <td>Victoires</td>
                    <td>Défaites</td>
                    <td>Matchs nuls</td>
                    <td>Victoires</td>
                    <td>Défaites</td>
                    <td>Matchs nuls</td>
                </tr>
                <tr colspan="3">
                    <td>{this.props.playerGameStatus[0]["win"]}</td>
                    <td>{this.props.playerGameStatus[0]["lost"]}</td>
                    <td>{this.props.playerGameStatus[0]["draws"]}</td>
                    <td>{this.props.playerGameStatus[1]["win"]}</td>
                    <td>{this.props.playerGameStatus[1]["lost"]}</td>
                    <td>{this.props.playerGameStatus[1]["draws"]}</td>
                </tr>
            </table>
        );
    }
}

export default PlayerStatus;
