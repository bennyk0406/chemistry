/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { STATE } from "../../../server/src/table";

const color = {
    solid: "#54534f",
    liquid: "#537da5",
    gas: "#bc554d"
}

interface ChemicalButtonProps extends React.PropsWithChildren {
    name: string;
    period: number;
    family: number;
    action: () => void;
    state: STATE;
    selected: boolean;
}

const ChemicalButton: React.FC<ChemicalButtonProps> = (props) =>
    <div
        css={css`
            background-color: ${props.selected ? "#f6f6f6": "#ffffff"};
            border: 1px solid #dededc;
            box-shadow: #63636333 0px 2px 8px 0px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            font-size: 15px;
            border-radius: 10px;
            transition: all 0.3s ease 0s;
            cursor: pointer;
            :hover {
                background-color: #efefef;
                box-shadow: 0px 15px 20px #63636333;
                transform: translateY(-5px);
            }
        `}
        onClick={props.action}
    >
        <div css={css`
            padding: 0 5px 2px;
            text-align: left;
            padding-bottom: 2px;
            color: #909090;
        `}>
            {`Group ${props.family}`}
        </div>
        <div css={css`
            font-size: 35px;
            color: ${color[props.state]};
            text-align: center;
        `}>
            {props.name}
        </div>
        <div css={css`
            padding: 0 5px 2px;
            text-align: right;
            color: #909090;
        `}>
            {`Period ${props.period}`}
        </div>
    </div>

export default ChemicalButton;