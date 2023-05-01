import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

const ws = new WebSocket("ws://localhost:8001")
ws.onopen = () => { //webSocket이 맺어지고 난 후, 실행
    ws.send("asdf");
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)
