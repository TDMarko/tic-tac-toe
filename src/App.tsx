import { h } from "preact";

import Board from "./components/board/Board";

export function App() {
    // Using inline styles for this test task
    const style = {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        fontFamily: "Arial, serif",
    };

    return <div style={style}><Board /></div>;
}