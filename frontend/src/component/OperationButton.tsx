/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react";

interface OperationButtonProps extends React.PropsWithChildren {
    name: string;
    style?: SerializedStyles;
    action?: () => void;
}

const OperationButton: React.FC<OperationButtonProps> = (props) =>
    <div css={css`
        ${props.style};
        background-color: #f7f7f7;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        border-radius: 10px;
        border: 2px black solid;
        flex: auto;
    `}
    onClick={props.action}>
        {props.name}
    </div>;

export default OperationButton;