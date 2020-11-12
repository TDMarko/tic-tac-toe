import "jsdom-global/register";

import { h } from "preact";
import Adapter from "enzyme-adapter-preact-pure";
import { configure, mount, shallow } from "enzyme";

import { calculateWinner } from "../utils/utils";

import { ESign } from "../components/board/Board";
import Board from "../components/board/Board";

configure({ adapter: new Adapter });

describe("Board", () => {
    it("should render Board component correctly", () => {
        const wrapper = mount(<Board />);
        expect(wrapper).toMatchSnapshot();
    });

    it("should render Board component correctly width initial state", () => {
        const wrapper = shallow(<Board />); 
        expect(wrapper.state("move")).toEqual(0);
        expect(wrapper.state("turn")).toEqual(ESign.X);
        expect(wrapper.state("isGameWon")).toBeFalsy();
    });
});

describe("Utils", () => {
    it("should return null if no winner", () => {
        const noMoves = [];
        expect(calculateWinner(noMoves)).toBe(null);

        const moves = ["O", null, null, null, "X", "O", null, "O", "X"];
        expect(calculateWinner(moves)).toEqual(null);
    });

    it("should return winner X if x has a line", () => {
        const moves = ["X", null, null, null, "X", "O", null, "O", "X"];
        expect(calculateWinner(moves)).toEqual("X");
    });
});