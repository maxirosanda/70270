import express from 'express';
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js';
import usersRouter from './routes/users.router.js';
import mongoose from 'mongoose';
import config from './config/config.js';
import cluster from "cluster"
import { cpus } from "os";





const app = express();
const PORT = process.env.PORT||8000;
const connection = mongoose.connect(config.mongo.URL);
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');

app.use(express.json());
app.use(express.urlencoded({extended:true}))

app.use('/',viewsRouter);
app.use('/api/users',usersRouter);

if(cluster.isPrimary){
    console.log("Soy el cluster principal")
    for(let i = 0; i < cpus().length; i++){
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
