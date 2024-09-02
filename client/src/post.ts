import { AllServerRes, ClientRes, ServerRes } from "../../interface/index"
import { WEBSOCKET_HOST } from "./server.config"

const ws = new WebSocket(WEBSOCKET_HOST)
const requestMsg = (clientRes: ClientRes) => {
    ws.send(JSON.stringify(clientRes))
}

type wsEventListener<T> = (serverRes: ServerRes<T>) => void;
const wsEventListeners: Record<string, wsEventListener<any>[]> = {}
const addWsEventListner = <T extends AllServerRes["type"]>(ev: T, cb: wsEventListener<T>) => {
    wsEventListeners[ev] ??= []
    wsEventListeners[ev].push(cb)
}

ws.addEventListener("message", (ev) => {
    const serverRes = JSON.parse(ev.data) as AllServerRes
    wsEventListeners[serverRes.type].forEach((cb) => cb(serverRes));
})

addWsEventListner("error", (serverRes) => {
    window.alert(serverRes.content.message)
})

export { requestMsg, addWsEventListner }