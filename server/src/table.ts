import { ELEMENTS, ElementData } from "./data/element";

const state = ["solid", "liquid", "gas"] as const
type STATE = typeof state[number]

class ChemicalElement {
    constructor(
        public name: string,
        public period: number,
        public family: number,
        public state: STATE
    ) {}
}

type Table = ChemicalElement[]

const select = (L: any[], amount: number) =>
    L.map((v) => [v, Math.random()])
        .sort((a, b) => b[1] - a[1])
        .map((v) => v[0])
        .slice(0, amount)

const FAMILY = [1, 2, 13, 14, 15, 16, 17, 18]
const PERIOD = [2, 3, 4, 5, 6, 7]

const setTable = (): Table => {
    const family = select(FAMILY, 3)
    const period = select(PERIOD, 3)
    const result = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            const element = ELEMENTS.find((v) => v.family === family[i] && v.period === period[j]) as ElementData
            for (let k = 0; k < 3; k++) {
                result.push(new ChemicalElement(element.name, element.period, element.family, state[k]))
            }
        }
    }
    return select(result, 9)
}

const isChem = (a: ChemicalElement, b: ChemicalElement, c: ChemicalElement) => {
    const validFamily = (a.family === b.family && b.family === c.family) || (a.family !== b.family && b.family !== c.family && c.family !== a.family) 
    const validPeriod = (a.period === b.period && b.period === c.period) || (a.period !== b.period && b.period !== c.period && c.period !== a.period) 
    const validState = (a.state === b.state && b.state === c.state) || (a.state !== b.state && b.state !== c.state && c.state !== a.state)
    return validFamily && validPeriod && validState 
}

const countChem = (table: Table) => {
    let count = 0
    for (let i = 0; i < 9; i++) {
        for (let j = i + 1; j < 9; j++) {
            for (let k = j + 1; k < 9; k++) {
                if (isChem(table[i], table[j], table[k])) count++
            }
        }
    }
    return count
}

export { type STATE, type Table, setTable, isChem, countChem }