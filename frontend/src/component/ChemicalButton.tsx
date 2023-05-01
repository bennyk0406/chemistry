/** @jsxImportSource @emotion/react */
import { SerializedStyles, css } from "@emotion/react";

const color = {
    solid:"#000000",
    liquid: "#0d56c3",
    gas: "#f64b56"
}

interface ChemicalButtonProps extends React.PropsWithChildren {
    name: string;
    style?: SerializedStyles;
    state: "solid" | "liquid" | "gas";
}

const ChemicalButton: React.FC<ChemicalButtonProps> = (props) =>
    <div css={css`
        ${props.style};
        color: ${color[props.state]};
        background-color: #f7f7f7;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 35px;
        border-radius: 10px;
        border: 2px black solid;
    `}>
        {props.name}
    </div>;

export default ChemicalButton;