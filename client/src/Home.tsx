/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useNavigate } from "react-router-dom"
import Card from "./component/Card"

const Home = () => {
    const navigate = useNavigate()

    return (
        <div
            css={css`
                display: flex;
                gap: 50px;
                flex-direction: column;
            `}
        >
            <Card width={250} height={150} style={css`font-size: 30px;`} onClick={() => navigate("./create")}>
                Create Room
            </Card>
            <Card width={250} height={150} style={css`font-size: 30px;`} onClick={() => navigate("./join")}>
                Join Game
            </Card>
        </div>
    )
}

export { Home }