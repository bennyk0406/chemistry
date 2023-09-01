/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

interface ScoreProps extends React.PropsWithChildren {
    player: string
    score: number
    highlight: boolean
}

const Score: React.FC<ScoreProps> = (props) =>
    <div css={css`
        border: 1px solid #dededc;
        ${
            props.highlight
            ? `
                background-color: #ddddff;
                box-shadow: 0px 15px 20px #63636333;
                transform: translateY(-5px);
            `
            : `
                background-color: #ffffff;
                box-shadow: #63636333 0px 2px 8px 0px;
            `
        }
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 10px;
        flex: auto;
        height: 100px;
        width: 100px;
        flex-direction: column;
    `}>
        <div css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 15px;
            height: 30px;
            border-bottom: 1px #dededc solid;
            width: 90%;
        `}>
            {props.player}
        </div>
        <div css={css`
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 45px;
            flex-grow: 1;
        `}>
            {props.score}
        </div>
    </div>

export default Score;