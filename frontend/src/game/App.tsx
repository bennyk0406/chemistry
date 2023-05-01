/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";

import ChemicalButton from "../component/ChemicalButton";
import OperationButton from "../component/OperationButton";

const App = () =>
    <div css={css`
        display: flex;
        flex-direction: row;
        gap: 50px;
    `}>
        <div css={css`
            display: flex;
            flex-direction: column;
            gap: 40px;
        `}>
            <div css={css`
                display: grid;
                width: 500px;
                height: 500px;
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(3, 1fr);
                gap: 10px;
                
            `}>
                <ChemicalButton
                    name="Br"
                    style={css`
                        grid-column: 1 / 2;
                        grid-row: 1 / 2;
                    `}
                    state="liquid"
                />
                <ChemicalButton
                    name="Br"
                    style={css`
                        grid-column: 2 / 3;
                        grid-row: 1 / 2;
                    `}
                    state="liquid"
                />
                <ChemicalButton
                    name="Br"
                    style={css`
                        grid-column: 3 / 4;
                        grid-row: 1 / 2;
                    `}
                    state="liquid"
                />
                <ChemicalButton
                    name="Br"
                    style={css`
                        grid-column: 1 / 2;
                        grid-row: 2 / 3;
                    `}
                    state="liquid"
                />
                <ChemicalButton
                    name="Br"
                    style={css`
                        grid-column: 2 / 3;
                        grid-row: 2 / 3;
                    `}
                    state="liquid"
                />
                <ChemicalButton
                    name="Br"
                    style={css`
                        grid-column: 3 / 4;
                        grid-row: 2 / 3;
                    `}
                    state="liquid"
                />
                <ChemicalButton
                    name="Br"
                    style={css`
                        grid-column: 1 / 2;
                        grid-row: 3 / 4;
                    `}
                    state="liquid"
                />
                <ChemicalButton
                    name="Br"
                    style={css`
                        grid-column: 2 / 3;
                        grid-row: 3 / 4;
                    `}
                    state="liquid"
                />
                <ChemicalButton
                    name="Br"
                    style={css`
                        grid-column: 3 / 4;
                        grid-row: 3 / 4;
                    `}
                    state="liquid"
                />
            </div>
            <div css={css`
                display: flex;
                flex-direction: row;
                width: 100%;
                gap: 50px;
                height: 70px;
            `}>
                <OperationButton
                    name="화"
                />
                <OperationButton
                    name="학"
                />
            </div>
        </div>
        <div css={css`
            display: flex;
            flex-direction: column;
            flex: auto;
            gap: 40px;
            width: 300px;
            background-color: #f7f7f7;
            border-radius: 10px;
            border: 2px solid black;
            align-self: stretch;
        `}>
            화
        </div>
    </div>

export default App