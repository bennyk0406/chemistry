import { resolve } from "path"
import { Table, countChem, isChem, setTable } from "./table"
import express from "express"
import { AllServerRes, ClientRes, ServerRes } from "../../interface"
import WebSocket from "ws"

const app = express()
app.use(express.static(resolve(__dirname, "../../client/build")))
app.use(express.json())
app.get("*", (_, res) => {
    res.sendFile(resolve(__dirname, "../../client/build/index.html"));
})
const server = app.listen(80, () => {
    console.log("The server has started!")
})

const wsServer = new WebSocket.Server({ server })

class RoomData {
    public round: number
    public table: Table
    public turnOwner: 0 | 1
    public score: [number, number]
    public leftChem: number
    public chemList: number[][]
    public sockets: WebSocket.WebSocket[]
    public sessionKeys: string[]
    public timeout?: NodeJS.Timeout
    public roomNumber: string
    public roundLimit = 5

    constructor(socket: WebSocket.WebSocket, roomNumber: string, sessionKey: string) {
        this.round = 0
        this.table = setTable()
        this.turnOwner = 0
        this.score = [0, 0]
        this.leftChem = countChem(this.table)
        this.chemList = []
        this.sockets = [socket]
        this.sessionKeys = [sessionKey]
        this.roomNumber = roomNumber
    }

    static generateSessionKey(len = 10) {
        const rand = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
        return new Array(len).fill(null).map(() => rand[Math.floor(Math.random() * rand.length)]).join("")
    }

    repeated(selected: number[]) {
        return this.chemList.some((v) => v.every((e, i) => e === selected[i]))
    }

    checkChem(selected: number[]) {
        const table = this.table
        if (table === undefined) return false
        return isChem(table[selected[0]], table[selected[1]], table[selected[2]])
    }

    allSend(serverRes: AllServerRes) {
        this.sockets.forEach((socket) => socket.send(JSON.stringify(serverRes)))
    }

    changeTurn() {
        this.turnOwner = (this.turnOwner ^ 1) as 0 | 1
        this.sendGameData()
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            this.changeTurn()
        }, 15_000)
    }

    findSessionKey(sessionKey: string) {
        return this.sessionKeys.indexOf(sessionKey)
    }

    sendGameData() {
        this.allSend({
            type: "gameData",
            content: {
                round: this.round,
                table: this.table,
                score: this.score,
                chemList: this.chemList,
                turnOwner: this.turnOwner
            }
        })
    }

    finish() {
        clearTimeout(this.timeout)
        this.allSend({
            type: "finish",
            content: {
                score: this.score
            }
        })
        gameData.delete(this.roomNumber)
    }

    nextRound() {
        this.round++
        if (this.round > this.roundLimit) {
            this.finish()
            return
        }
        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
            this.changeTurn()
        }, 15_000)
        this.table = setTable()
        this.leftChem = countChem(this.table)
        this.chemList = []
        this.turnOwner = (this.round + 1) % 2 as 0 | 1
        setTimeout(() => {
            this.allSend({
                type: "round",
                content: {
                    round: this.round
                }
            })
        }, 500)
    }
}

const gameData = new Map<string, RoomData>()

const format = (n: number, digit = 4) => n.toString().padStart(digit, "0")
const getMex = (m = gameData, limit = 10000) => {
    for (let i = 0; i < limit; i++) {
        if (!m.has(format(i))) return i
    }
    return limit
}

wsServer.on("connection", (socket) => {
    socket.on("message", (data) => {
        const send = (serverRes: AllServerRes) => {
            socket.send(JSON.stringify(serverRes))
        }

        const { query, content } = JSON.parse(data.toString()) as ClientRes
        if (query === "create") {
            const room = format(getMex())
            const sessionKey = RoomData.generateSessionKey()
            gameData.set(room, new RoomData(socket, room, sessionKey))
            send({
                type: "create",
                content: {
                    room,
                    sessionKey
                }
            })
            return
        }

        const { room } = content
        if (!gameData.has(room)) {
            send({
                type: "join_fail",
                content: {
                    room
                }
            })
            return
        }
        const roomData = gameData.get(room) as RoomData

        if (query === "participate") {
            const sessionKey = RoomData.generateSessionKey()
            roomData.sockets.push(socket)
            roomData.sessionKeys.push(sessionKey)
            send({
                type: "participate",
                content: {
                    room,
                    sessionKey
                }
            })
            roomData.allSend({
                type: "start",
                content: null
            })
            roomData.nextRound()
            return
        }

        if (query === "getGameData") {
            roomData.sendGameData()
            return
        }

        const { sessionKey } = content
        const player = roomData.findSessionKey(sessionKey)
        if (player === -1) {
            send({
                type: "error",
                content: {
                    message: "Invalid user."
                }
            })
            return
        }

        if (player !== roomData.turnOwner) {
            send({
                type: "error",
                content: {
                    message: "It's not your turn."
                }
            })
            return
        }

        if (query === "checkChem") {
            const { selected } = content
            if (selected.length !== 3) {
                send({
                    type: "error",
                    content: {
                        message: "Three chemical elements must be selected."
                    }
                })
                return
            }
            if (roomData.repeated(selected)) {
                send({
                    type: "error",
                    content: {
                        message: `The Chem combination ${selected.map((v) => v + 1).join(", ")} was previously selected.`
                    }
                })
                roomData.score[roomData.turnOwner] -= 1
                roomData.changeTurn()
                return
            }
            const chem = roomData.checkChem(selected)
            if (chem) {
                roomData.score[roomData.turnOwner]++
                roomData.chemList.push(selected)
                roomData.leftChem--
                roomData.sendGameData()
                roomData.timeout = setTimeout(() => {
                    roomData.changeTurn()
                }, 5_000)
            }
            else {
                roomData.score[roomData.turnOwner]--
                roomData.changeTurn()
            }
            send({
                type: "chem",
                content: {
                    chem
                }
            })
            return
        }

        if (query === "checkTry") {
            const isTry = roomData.leftChem === 0
            if (isTry) roomData.score[roomData.turnOwner] += 3
            else roomData.score[roomData.turnOwner] -= 1
            send({
                type: "try",
                content: {
                    try: isTry
                }
            })
            if (isTry) {
                roomData.nextRound()
                return
            }
            roomData.changeTurn()
            return
        }
    })
})