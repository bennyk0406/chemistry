import WebSocket from "ws"
import { Table, setTable } from "./table";

const wss = new WebSocket.Server({ port: 8001 })

interface MessageType {
    type: string;
    content?: string;
}

class RoomData {
    table?: Table;
    turnOwner?: 0 | 1;
}

const format = (n: number, digit = 4) => n.toString().padStart(digit, "0")

const gameData = new Map<string, RoomData>()

const getMex = (m = gameData, limit = 10000) => {
    for (let i = 0; i < limit; i++) {
        if (!m.has(format(i))) return i
    }
}

wss.on("connection", (ws: WebSocket) => {
    ws.on("message", (data: WebSocket.RawData) => {
        const msg: MessageType = JSON.parse(data.toString())
        if (msg.type === "create") {
            const room = format(getMex() as number)
            gameData.set(room, new RoomData())
            const reply = {
                type: "create",
                content: room
            }
            ws.send(JSON.stringify(reply))
            return
        }
        if (msg.type === "participate") {
            const content = msg.content as string
            if (!gameData.has(content)) {
                const reply = {
                    type: "error",
                    content: `The room with the number ${content} does not exist.`
                }
                ws.send(JSON.stringify(reply))
                return
            }
            const roomData = gameData.get(content) as RoomData
            roomData.table = setTable()
            roomData.turnOwner = 0
            return
        }
    })
})
