/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react";

import ChemicalButton from "./component/ChemicalButton";
import OperationButton from "./component/OperationButton";
import Score from "./component/Score";
import { addWsEventListner, requestMsg } from "./post";
import type { Table } from "../../server/src/table"
import Round from "./component/Round";
import Card from "./component/Card";
import { useNavigate } from "react-router-dom";

interface TimerProps {
    round: number
}
const Timer: React.FC<TimerProps> = (props) => {
    const [text, setText] = useState(`ROUND ${props.round}`)
    useEffect(() => {
        setTimeout(() => {
            setText("3")
        }, 1000)
        setTimeout(() => {
            setText("2")
        }, 2000)
        setTimeout(() => {
            setText("1")
        }, 3000)
        setTimeout(() => {
            setText("GO!")
        }, 4000)
    }, [])

    return (
        <Card width={250} height={150} style={css`font-size: 30px;`}>
            {text}
        </Card>
    )
}

const Play = () => {
    const [table, setTable] = useState<Table>([])
    const [selected, setSelected] = useState<boolean[]>(new Array(9).fill(false))
    const [score, setScore] = useState<[number, number]>([0, 0])
    const [chemList, setChemList] = useState<number[][]>([])
    const [turnOwner, setTurnOwner] = useState<0 | 1>(0);
    const [round, setRound] = useState(0);

    const toggleSelected = (i: number) => {
        setSelected((rawSelected) => {
            const selected = [...rawSelected]
            selected[i] = !selected[i]
            return selected
        })
    }

    useEffect(() => {
        addWsEventListner("gameData", (serverRes) => {
            setTable(serverRes.content.table)
            setScore(serverRes.content.score)
            setChemList(serverRes.content.chemList)
            setTurnOwner(serverRes.content.turnOwner)
            setRound(serverRes.content.round)
        })
        addWsEventListner("chem", (serverRes) => {
            // TODO
        })
        addWsEventListner("try", (serverRes) => {
            // TODO
        })
        requestMsg({
            query: "getGameData",
            content: {
                room: localStorage.getItem("room") ?? ""
            }
        })
    }, [])

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: center;
            height: 100%;
            padding: 30px 0;
            box-sizing: border-box;
        `}>
            <div css={css`
                width: 210px;
                height: 40px;
                border-radius: 20px;
                padding: 0 5px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border: 1px solid #dededc;
                background-color: #ffffff;
                box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
            `}>
                {new Array(5).fill(null).map((_, i) =>
                    <Round type={i + 1 < round ? "already" : i + 1 === round ? "now" : "expected"} />
                )}
            </div>
            <div css={css`
                display: flex;
                flex-direction: row;
                justify-content: space-around;
                width: 100%;
                align-items: center;
                gap: 100px;
            `}>
                <Score player={localStorage.getItem("team") === "0" ? "You" : "Opponent"} score={score[0]} highlight={turnOwner === 0} />
                <div css={css`
                    display: flex;
                    flex-direction: row;
                    gap: 50px;
                    padding: 20px;
                    background-color: #ffffff;
                    border: 1px solid #dededc;
                    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                    border-radius: 10px;
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
                            gap: 20px;
                            
                        `}>
                            {table.length === 0
                                ? <div />
                                : table.map((elem, i) =>
                                    <ChemicalButton
                                        name={elem.name}
                                        state={elem.state}
                                        period={elem.period}
                                        family={elem.family}
                                        action={
                                            () => toggleSelected(i)
                                        }
                                        selected={selected[i]}
                                    />
                                )}
                        </div>
                        <div css={css`
                            display: flex;
                            flex-direction: row;
                            width: 100%;
                            gap: 50px;
                            height: 70px;
                        `}>
                            <OperationButton
                                name="Chem?"
                                action={() => {
                                    requestMsg({
                                        query: "checkChem",
                                        content: {
                                            room: localStorage.getItem("room") ?? "",
                                            sessionKey: localStorage.getItem("sessionKey") ?? "",
                                            selected: selected.map((v, i) => [v, i] as [boolean, number]).filter(([v]) => v).map(([_, i]) => i)
                                        }
                                    })
                                    setSelected(new Array(9).fill(false))
                                }}
                            />
                            <OperationButton
                                name="Try!"
                                action={() => {
                                    requestMsg({
                                        query: "checkTry",
                                        content: {
                                            room: localStorage.getItem("room") ?? "",
                                            sessionKey: localStorage.getItem("sessionKey") ?? ""
                                        }
                                    })
                                }}
                            />
                        </div>
                    </div>
                    <div css={css`
                        display: flex;
                        flex-direction: column;
                        flex: auto;
                        width: 300px;
                        background-color: #ffffff;
                        border: 1px solid #dededc;
                        box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
                        border-radius: 10px;
                        align-self: stretch;
                        overflow-y: scroll;
                        -ms-overflow-style: none;
                        scrollbar-width: none;
                    `}>
                        <div css={css`
                            padding: 10px 0;
                            font-size: 25px;
                            border-bottom: 1px solid #dfdfde;
                            text-align: center;
                        `}>Chem List</div>
                        {chemList.map((v) => (
                            <div css={css`
                                height: 30px;
                                border-bottom: 1px solid #dededc;
                                display: flex;
                                justify-content: center;
                                align-items: center;
                            `}>
                                {v.map((i) => i + 1).join(" ")}
                            </div>
                        ))}
                    </div>
                </div>
                <Score player={localStorage.getItem("team") === "0" ? "Opponent" : "You"} score={score[1]} highlight={turnOwner === 1} />
            </div>
        </div>
    )
}

interface FinishProps {
    score: [number, number]
}

const Finish: React.FC<FinishProps> = (props) => {
    const { score } = props
    const team = localStorage.getItem("team") as string
    const teamNum = parseInt(team)
    const opponentNum = 1 - teamNum
    const navigate = useNavigate()

    return (
        <div css={css`
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            gap: 50px;
        `}>
            <div css={css`
                font-size: 30px;
            `}>
                {score[teamNum] > score[opponentNum]
                ? "You win!"
                : score[teamNum] === score[opponentNum]
                ? "Draw!"
                : "You are defeated."}
            </div>
            <div css={css`
                display: flex;
                flex-direction: row;
                gap: 70px;
                align-items: center;
                justify-content: center;
            `}>
                <Score player={team === "0" ? "You" : "Opponent"} score={score[0]} highlight={false} />
                <div css={css`
                    font-size: 45px;
                `}>
                    :
                </div>
                <Score player={team === "0" ? "Opponent" : "You"} score={score[1]} highlight={false} />
            </div>
            <OperationButton name="Play Again!" action={() => navigate("../")} style={css`
                font-size: 40px;
                height: 60px;
                padding: 0 20px;
                margin-top: 30px;
            `}/>
        </div>
    )
}

const Game = () => {
    const [component, setComponent] = useState(<div />)

    useEffect(() => {
        addWsEventListner("round", (serverRes) => {
            setComponent(<Timer round={serverRes.content.round} />)
            setTimeout(() => {
                setComponent(<Play />)
            }, 5000)
        })
        addWsEventListner("finish", (serverRes) => {
            setComponent(<Finish score={serverRes.content.score} />)
        })
    }, [])

    return component
}

export { Game }