import { h } from "preact";

import { ESign } from "../Board";

export interface ICell {
    cellIndex: number;
    sign: ESign;
    winningPattern: number[] | null;
    onClick: () => void;
}

// I know this component might be redundant, but trying to make good project structure
export const Cell = (props: ICell) => {
    const { sign, cellIndex, winningPattern, onClick } = props;

    // Using inline styles for this test task
    const style = {
        width: "10em",
        height: "10em",
        border: "1px solid #ccc",
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: winningPattern?.includes(cellIndex) ? "red": "transparent",
        transition: "background-color 1s linear",

    }
    const signStyle = {
        fontSize: "3em",
        fontFamily: "Arial, serif",
        color: "#fff",
    }

    return <div style={style} onClick={onClick}>
        <span style={signStyle}>{sign}</span>
    </div>
}
