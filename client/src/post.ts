import { AllServerRes, ClientRes, ServerRes } from "../../interface/index"

const ws = new WebSocket(`ws://${window.location.host}:80`)
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
    console.log(serverRes)
    wsEventListeners[serverRes.type].forEach((cb) => cb(serverRes));
})

addWsEventListner("error", (serverRes) => {
    window.alert(serverRes.content.message)
})

export { requestMsg, addWsEventListner }