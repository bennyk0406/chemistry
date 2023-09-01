import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "./Home"
import { Create } from "./Create"
import { Game } from "./Game"
import { Participate } from "./Participate"

const App = () =>
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/game" element={<Game />} />
            <Route path="/join" element={<Participate />} />
        </Routes>
    </BrowserRouter>
export default App