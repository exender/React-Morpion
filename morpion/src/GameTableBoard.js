import React, { Component } from "react";

class GameTableBoard extends Component {
    handleClick(e, x, y) {
        console.log("X : " + x + " Y : " + e);
        this.props.onClick(x, e);
    }

    render() {
        return (
            <table border="1px" id="tictactoePlayersStatus" >
                <tr>
                    <td x="0" y="0" onClick={this.handleClick.bind(this, 0, 0)}>
                        {this.props.board[0][0]}
                    </td>
                    <td x="0" y="1" onClick={this.handleClick.bind(this, 1, 0)}>
                        {this.props.board[0][1]}
                    </td>
                    <td x="0" y="2" onClick={this.handleClick.bind(this, 2, 0)}>
                        {this.props.board[0][2]}
                    </td>
                </tr>
                <tr>
                    <td x="1" y="0" onClick={this.handleClick.bind(this, 0, 1)}>
                        {this.props.board[1][0]}
                    </td>
                    <td x="1" y="1" onClick={this.handleClick.bind(this, 1, 1)}>
                        {this.props.board[1][1]}
                    </td>
                    <td x="1" y="2" onClick={this.handleClick.bind(this, 2, 1)}>
                        {this.props.board[1][2]}
                    </td>
                </tr>
                <tr>
                    <td x="2" y="0" onClick={this.handleClick.bind(this, 0, 2)}>
                        {this.props.board[2][0]}
                    </td>
                    <td x="2" y="1" onClick={this.handleClick.bind(this, 1, 2)}>
                        {this.props.board[2][1]}
                    </td>
                    <td x="2" y="2" onClick={this.handleClick.bind(this, 2, 2)}>
                        {this.props.board[2][2]}
                    </td>
                </tr>
            </table>
        );
    }
}

export default GameTableBoard;
