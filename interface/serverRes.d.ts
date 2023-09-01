import { Table } from "../server/src/table";

type AllServerRes = {
    type: "error"
    content: {
        message: string
    }
} | {
    type: "create"
    content: {
        room: string
        sessionKey: string
    }
} | {
    type: "participate"
    content: {
        sessionKey: string
        room: string
    }
} | {
    type: "start"
    content: null
} | {
    type: "chem"
    content: {
        chem: boolean
    }
} | {
    type: "try"
    content: {
        try: boolean
    }
} | {
    type: "gameData"
    content: {
        round: number
        table: Table
        score: [number, number]
        chemList: number[][]
        turnOwner: 0 | 1
    }
} | {
    type: "round"
    content: {
        round: number
    }
} | {
    type: "join_fail"
    content: {
        room: string
    }
} | {
    type: "finish"
    content: {
        score: [number, number]
    }
}

type ServerRes<T> = Extract<AllServerRes, { type: T }>

export type { AllServerRes, ServerRes }