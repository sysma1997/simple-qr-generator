import React, { useState, useEffect, useRef, ChangeEvent } from "react"
import ReactDOM from "react-dom/client"
import QRCode from "qrcode"

import { Footer } from "./shared/footer"

import "./index.scss"

document.title = "Home"

const Canvas = (props: any) => {
    const ref = useRef(null)

    useEffect(() => {
        const canvas: HTMLCanvasElement = ref.current
        const context = canvas.getContext("2d")


    }, [])

    return <canvas ref={ref} {...props} />
}

const App = () => {
    const [text, setText] = useState<string>("")
    const [data, setData] = useState<string>()

    const changeText = (event: ChangeEvent<HTMLInputElement>) => {
        const text = event.target.value

        if (!text) {
            setData(undefined)
            setText("")

            return
        }

        setText(text)

        QRCode.toDataURL(text).then(url => {
            console.log(url)
            setData(url)
        })
    }

    return <>
        <div className="content">
            <input
                placeholder="Digite el texto para convertir en un codigo QR"
                value={text}
                onChange={changeText} />
            {(data) && <div className="result">
                <img src={data} />
                <a href={data} target="_blank" download>Descargar</a>
            </div>}
        </div>
        <Footer />
    </>
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(<App />)