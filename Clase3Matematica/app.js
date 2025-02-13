import express from "express"
import { suma, resta,multiplicacion,division } from "clase3matematicacoder"
import cluster from "cluster"
import { cpus } from "os";

const app = express();
const PORT = process.env.PORT || 8080;

// Ruta para la suma (ejemplo: /suma/5/3)
app.get("/suma/:a/:b", (req, res) => {
    const { a, b } = req.params;
    res.json({ resultado: suma(Number(a), Number(b)) });
});

// Ruta para la resta (ejemplo: /resta/10/4)
app.get("/resta/:a/:b", (req, res) => {
    const { a, b } = req.params;
    res.json({ resultado: resta(Number(a), Number(b)) });
});

// Ruta para la multiplicación (ejemplo: /multiplicacion/6/7)
app.get("/multiplicacion/:a/:b", (req, res) => {
    const { a, b } = req.params;
    res.json({ resultado: multiplicacion(Number(a), Number(b)) });
});

// Ruta para la división (ejemplo: /division/10/2)
app.get("/division/:a/:b", (req, res) => {
    try {
        const { a, b } = req.params;
        res.json({ resultado: division(Number(a), Number(b)) });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


app.get('/operacionsencilla', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 1000000; i++) {
        sum += i;
    }
    
    res.send({ sum });
});
app.get('/operacioncompleja', (req, res) => {
    let sum = 0;
    for (let i = 0; i < 5e8; i++) {
        sum += i;
    }
    res.send({ sum });
});


if(cluster.isPrimary){
    console.log("Soy el cluster principal")
    for(let i = 1; i < cpus().length; i++){
        cluster.fork()
    }

    cluster.on("exit", (worker) => {
        console.log(`Worker ${worker.process.pid} died`)
        cluster.fork()
    })
}else{
    console.log(`Soy el cluster ${process.pid}`)
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}





