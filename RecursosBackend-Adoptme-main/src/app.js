import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv'
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import { faker } from '@faker-js/faker';
import errorHandler from './middlewares/errors.js'
import { addLogger, logger } from './utils/logger.js';


dotenv.config()
const app = express();
const PORT = process.env.PORT||3000;
const connection = mongoose.connect(process.env.MONGO_URL)

app.use(express.json());
app.use(cookieParser());
app.use(addLogger)
app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);


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

app.get('/api/test/user', (req, res) => {
    let first_name = faker.person.firstName();
    let last_name = faker.person.lastName();
    let email = faker.internet.email();
    let password = faker.internet.password();
    res.send({ first_name, last_name, email, password });
});

app.get("/loggertest",(req,res)=>{
    //req.logger.info("Info message")
    req.logger.error("Error message")
    req.logger.warn("Warning message")
    req.logger.debug("Debug message")
    req.logger.fatal("Fatal message")
    res.send("Logger test")
})

app.get("/mockingpets",(req,res)=> {
    const pets = []
    const speciesList = ["dog","cat","fish"]

    for(let i=0;i<100;i++){
        pets.push({
            name:faker.person.firstName(),
            specie:faker.helpers.arrayElement(speciesList),
            birthDate:faker.date.birthdate({min:1,max:15,mode:"age"}).toISOString().split("T")[0]
        })
    }
    res.send({status:"success",payload:pets})
})
app.use(errorHandler)
app.listen(PORT,()=>logger.info(`Listening on ${PORT}`))
