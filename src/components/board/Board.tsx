import { h, Component } from "preact";

import { Cell } from "./cell/Cell";

import { NUMBER_OF_CELLS } from "../../consts";

import { calculateWinner } from "../../utils/utils";

export enum ESign {
    X = "X",
    O = "O",
}

interface IBoardState {
    moves: ESign[] | null[];
    move: number;
    turn: ESign;
    isGameWon: boolean;
}

// Started to develop using functional approach, but seems like this preact version does not have hooks
export default class Board extends Component<{}, IBoardState> {
    private status: string;
    private winningPattern: number[] | null;

    constructor() {
        super();

        this.state = {
            moves: Array(9).fill(null),
            move: 0,
            turn: ESign.X,
            isGameWon: false,
        };

        this.onCellClick = this.onCellClick.bind(this);
        this.resetGame = this.resetGame.bind(this);
    }

    onCellClick(cellIndex: number) {
        const squares = this.state.moves.slice();

        if (squares[cellIndex] !== null || this.state.isGameWon) {
            console.log("Cell is taken or game is ended!")
            return;
        }

        squares[cellIndex] = this.state.turn;

        this.setState({
            moves: squares,
            move: this.state.move + 1,
            turn: this.state.turn === ESign.X ? ESign.O : ESign.X,
        }, () => {
            const winner = calculateWinner(this.state.moves);

            if (winner && winner[0]) {
                this.setState({
                    isGameWon: true,
                })
            }
        })
    }

    resetGame() {
        console.log("Game has been reset!")
        this.setState({
            moves: Array(9).fill(null),
            move: 0,
            turn: ESign.X,
            isGameWon: false,
        })
    }

    render() {
        const winner = calculateWinner(this.state.moves);
        const cells: JSX.Element[] = [];
        this.winningPattern = winner && winner[1];
        this.status = `
            ${winner
                ? `Won by ${winner[0]}`
                : this.state.move >= 9 ? "Seems like a tie 🤷‍♂️" : `Now turn: ${this.state.turn}`
            }
        `;

        // Using inline styles for this test task
        const style = {
            width: "30em",
            height: "30em",
            background: "#607d8b",
            justifyContent: "space-between",
            display: "flex",
            flexWrap: "wrap",
            borderRadius: "2em",
            overflow: "hidden",
        }
        const styleContainer = {
            width: "30em",
            fontSize: "0.5em",
            position: "relative",
        }
        const statusStyle = {
            fontSize: "2em",
            paddingTop: "1em",
            width: "10em",
            height: "5em",
            position: "absolute",
            left: "50%",
            // As alternative centering solution
            transform: "translateX(-50%)",
            textAlign: "center",
        }
        const resetStyle = {
            bottom: "-5em",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
        }
        const titleStyle = {
            fontSize: "3em",
            textAlign: "center",
            padding: "1em 0",
        };

        for (let i = 0; i < NUMBER_OF_CELLS; i++) {
            cells.push(
                <Cell
                    cellIndex={i}
                    sign={this.state.moves[i]}
                    winningPattern={this.winningPattern}
                    onClick={() => this.onCellClick(i)}
                />
            );
        }

        // I would use <> aka React.Fragment here, but seems like preact does not support it
        return <div style={styleContainer}>
            <div style={titleStyle}>Tic Tac Toe</div>
            <div style={style}>
                {cells.map(cell => cell)}
            </div>
            <div style={statusStyle}>{this.status}</div>
            {
                (winner || this.state.move >= 9)
                    && <button style={resetStyle} onClick={this.resetGame}>Reset game</button>
            }
        </div>
    }
}
