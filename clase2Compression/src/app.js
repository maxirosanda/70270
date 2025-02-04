import express from 'express'
import compression from 'express-compression'

const app = express()
app.use(compression({
    brotli:{enabled:true,zlib:{}},
    threshold:1024,
    filter: (req,res) => {
        const extension = req.url.split(".").pop()
        const noCompressTypes = ["jpg","jpeg","png","gif","mp4","mov"]
        return !noCompressTypes.includes(extension)
    }
}))
app.get("/stringlargo",(req,res)=>{
    let string = "Hola coders, soy un string muy largo"
    for(let i = 0 ; i < 10e5;i++){
        string += "Hola coders, soy un string muy largo"
    }
    res.send(string)
})

app.listen(8080,()=> console.log("server in port " + 8080))

