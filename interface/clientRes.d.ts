interface ClientResTemplate {
    query: string;
    content: object | null;
}

type ClientRes = {
    query: "create";
    content: null;
} | {
    query: "participate";
    content: {
        room: string
    }
} | {
    query: "checkChem";
    content: {
        room: string
        selected: number[]
        sessionKey: string
    }
} | {
    query: "checkTry";
    content: {
        room: string
        sessionKey: string
    }
} | {
    query: "getGameData";
    content: {
        room: string
    }
}

export type { ClientRes }