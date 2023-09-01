/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react";
import { useEffect, useState } from "react"
import { addWsEventListner, requestMsg } from "./post";
import { useNavigate } from "react-router-dom";
import Card from "./component/Card";

const Create = () => {
    const navigate = useNavigate()
    const [roomNumber, setRoomNumber] = useState("0000");

    useEffect(() => {
        addWsEventListner("create", (serverRes) => {
            const { room, sessionKey } = serverRes.content
            localStorage.setItem("room", room)
            setRoomNumber(room)
            localStorage.setItem("sessionKey", sessionKey)
            localStorage.setItem("team", "0")
        })
        addWsEventListner("start", () => {
            navigate("../game")
        })
        requestMsg({
            query: "create",
            content: null
        })
    }, [navigate])

    return (
        <div css={css`
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 25px;
        `}>
            <div css={css`
                font-size: 57px;
                text-align: center;
            `}>
                ROOM NUMBER
            </div>
            <div css={css`
                display: flex;
                gap: 15px;
            `}>
                {roomNumber.split("").map((char) => {
                    return (
                        <Card height={80} width={60} borderRadius={15} style={css`font-size: 47px;`}>
                            {char}
                        </Card>
                    )
                })}
            </div>
        </div>
    )
}

export { Create }