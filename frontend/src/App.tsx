/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

const App = () =>
    <div css={css`
        padding: 50px;
        background: #f7f7f7;
        font-size: 40px;
        border-radius: 10px;
        border: 2px black solid;
    `}
    onClick={() => { location.href = "./game" }}>
        게임 시작
    </div>

export default App