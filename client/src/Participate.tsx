/** @jsxImportSource @emotion/react */
import { css } from "@emotion/react"
import { useEffect, useRef, ChangeEventHandler, forwardRef } from "react"
import { addWsEventListner, requestMsg } from "./post"
import { useNavigate } from "react-router-dom";
import Card from "./component/Card";

interface InputProps {
    onChange: ChangeEventHandler<HTMLInputElement>
}

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
    return (
        <input css={css`
            height: 100%;
            width: 100%;
            border: none;
            background-color: transparent;
            outline: none;
            font-size: 50px;
            text-align: center;
            padding: 0;
            margin: 0;
        `} maxLength={1} ref={ref}
        onChange={props.onChange}
        />    
    )
})

const Participate = () => {
    const navigate = useNavigate()
    const input1 = useRef<HTMLInputElement>(null)
    const input2 = useRef<HTMLInputElement>(null)
    const input3 = useRef<HTMLInputElement>(null)
    const input4 = useRef<HTMLInputElement>(null)

    useEffect(() => {
        addWsEventListner("join_fail", (serverRes) => {
            input1.current && (input1.current.value = "")
            input2.current && (input2.current.value = "")
            input3.current && (input3.current.value = "")
            input4.current && (input4.current.value = "")
            window.alert(`The room '${serverRes.content.room}' does not exist.`)
            input1.current?.focus()
        })
        addWsEventListner("participate", (serverRes) => {
            const { room, sessionKey } = serverRes.content
            localStorage.setItem("room", room)
            localStorage.setItem("sessionKey", sessionKey)
            localStorage.setItem("team", "1")
        })
        addWsEventListner("start", () => {
            navigate("../game")
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
                ENTER THE ROOM NUMBER!
            </div>
            <div css={css`
                display: flex;
                gap: 15px;
            `}> 
                <Card height={80} width={60} borderRadius={15} style={css`font-size: 47px;`}>
                    <Input ref={input1}
                    onChange={(e) => {
                        e.target.value.length === 1 && input2.current?.focus()
                    }} />
                </Card>
                <Card height={80} width={60} borderRadius={15} style={css`font-size: 47px;`}>
                    <Input ref={input2}
                    onChange={(e) => {
                        e.target.value.length === 1 && input3.current?.focus()
                    }} />
                </Card>
                <Card height={80} width={60} borderRadius={15} style={css`font-size: 47px;`}>
                    <Input ref={input3}
                    onChange={(e) => {
                        e.target.value.length === 1 && input4.current?.focus()
                    }} />
                </Card>
                <Card height={80} width={60} borderRadius={15} style={css`font-size: 47px;`}>
                    <Input ref={input4}
                    onChange={(e) => {
                        if (e.target.value.length === 1) {
                            requestMsg({
                                query: "participate",
                                content: {
                                    room: (input1.current?.value ?? "") + (input2.current?.value ?? "") + (input3.current?.value ?? "") + (input4.current?.value ?? "")  
                                }
                            })
                        }
                    }} />
                </Card>
            </div>
        </div> 
    )
}

export { Participate }