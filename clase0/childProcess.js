import express from "express"
import {fork} from "child_process"

const app = express()

const operacionCompleja = () => {
    let resultado = 0

    for(let i = 0; i < 5e9; i++) {
        resultado += i
    }

    return resultado
}

app.get("'/calculo-bloq",(req,res) => {
    const resultado = operacionCompleja()
    res.send(`La suma es ${resultado}`)
})

app.get("/calculo-nobloq",(req,res) => {
    const child = fork("./operacionCompleja.js")
    child.send("start")
    child.on("message",resultado => {
        res.send(`La suma es ${resultado}`)
    })
})
let counter = 0
app.get("/",(req,res) => {
    counter++
    res.send(`Counter is ${counter}`)
})

app.listen(3000,() => { console.log("Server is running on port 3000") })