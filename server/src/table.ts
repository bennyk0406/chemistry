import { ELEMENTS, ElementData } from "./data/element";

enum STATE {
    solid,
    liquid,
    gas
}

class ChemicalElement {
    name: string;
    state: STATE;

    constructor(name: string, state: STATE) {
        this.name = name;
        this.state = state;
    }
}

type Table = ChemicalElement[]

const select = (L: any[], amount: number) =>
    L.map((v) => [v, Math.random()])
        .sort((v) => v[1])
        .map((v) => v[0])
        .slice(amount)

const FAMILY = [1, 2, 13, 14, 15, 16, 17, 18]
const PERIOD = [2, 3, 4, 5, 6, 7]

const setTable = (): Table => {
    const family = select(FAMILY, 3)
    const period = select(PERIOD, 3)
    const result = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            for (let k = 0; k < 3; k++) {
                const element = ELEMENTS.find((v) => v.family === family[i] && v.period === period[i]) as ElementData
                result.push(new ChemicalElement(element.name, k))
            }
        }   
    }
    return select(result, 3)
}

export { Table, setTable }