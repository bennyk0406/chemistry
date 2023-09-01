/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react"

interface CardProps {
    height: number
    width: number
    borderRadius?: number
    children?: React.ReactNode
    onClick?: () => void
    style?: SerializedStyles
}

const Card: React.FC<CardProps> = (props) => {
    return (
        <div css={css`
            width: ${props.width}px;
            height: ${props.height}px;
            border-radius: ${props.borderRadius ?? 15}px;
            border: 1px solid #dededc;
            box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #ffffff;
            ${props.style}
        `} onClick={props.onClick}>
            {props.children} 
        </div>
    )
}

export default Card