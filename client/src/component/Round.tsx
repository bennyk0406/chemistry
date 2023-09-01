/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"

interface RoundProps {
    type: "already" | "now" | "expected"
}

const Round: React.FC<RoundProps> = (props) => {
    return (
        <div css={css`
            width: 30px;
            height: 30px;
            border-radius: 15px;
            border: 1px solid #dededc;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: ${props.type === "already" ? "#f0f0f0" : props.type === "now" ? "#ddddff" : "transparent"};
        `} />
    )
}

export default Round