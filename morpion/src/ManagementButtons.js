import React, { Component } from "react";

class GameTableBoard extends Component {
    handleRazButtonClick(e) {
        console.log("Fonction de réinitialisation du plateau appelée...");
        this.props.razBoardOnClick(e);
    }

    handleRazScoresButtonClick(e) {
        console.log("Fonction de réinitialisation du score appelée...");
        this.props.razScoresOnClick(e);
    }

    cancelLastMove(e) {
        console.log("Annulation du dernier coup...");
        this.props.cancelLastMove(e);
    }

    render() {
        return (
            <div class="operationsManagment">
                <h2>Fonctions de gestions pour le jeu</h2>
                <tbody id="operationsManagment">
                    <tr>
                        <td>
                            <input
                                type="button"
                                onClick={this.handleRazButtonClick.bind(this)}
                                value="Réinitialiser le plateau"
                            />
                            <input
                                type="button"
                                onClick={this.handleRazScoresButtonClick.bind(this)}
                                value="Réinitialiser les scores"
                            />
                            <input
                                type="button"
                                onClick={this.cancelLastMove.bind(this)}
                                value="Enlever dernier coup"
                            />
                        </td>
                    </tr>
                </tbody>
            </div>
        );
    }
}

export default GameTableBoard;
