/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

interface OperationButtonProps extends React.PropsWithChildren {
    name: string;
    action: () => void;
}

const OperationButton: React.FC<OperationButtonProps> = (props) =>
    <div css={css`
        background-color: #ffffff;
        border: 1px solid #dededc;
        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 30px;
        border-radius: 10px;
        flex: auto;
        transition: all 0.3s ease 0s;
        cursor: pointer;
        :hover {
            background-color: #efefef;
            box-shadow: 0px 15px 20px #63636333;
            transform: translateY(-5px);
        }
    `}
        onClick={props.action}>
        {props.name}
    </div>;

export default OperationButton;