import express from "express";
import { options } from "./src/config/commander.js";
import { config } from "./src/config/config.js";

const app = express()

app.get("/",(req,res) => {
    res.send("Hello World")
})

app.get("/salir",(req,res) => {
    process.exit(0)
})



app.get("/suma",(req,res) => {
    res.send("Hello World")
})

process.on("exit",code => {
    console.log(`Server is stopping with code ${code}`)
})


app.listen(config.port,() => {
    console.log(`Server is running on port ${config.port}`)
})      
/*
console.log(process.cwd())
console.log(process.pid)
console.log(process.version)
console.log(process.platform)
console.log(process.arch)
console.log(process.argv.slice(2))
*/

// console.log(options)

/*console.log(config.port)
console.log(config.mongo_url)*/


