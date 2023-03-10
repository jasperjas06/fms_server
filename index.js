import express from 'express';
import config from './config/config.js'
import bodyParser from 'body-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import Student from './router/Student.js'
import Fine from './router/Fine.js'
import Staff from './router/Staff.js'
import Hod from './router/hod.js'
import Admin from './router/Admin.js'

dotenv.config()
const app = express();
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

config()

app.use('/api',Admin)
app.use('/api',Hod)
app.use('/api',Student)
app.use('/api',Fine)
app.use('/api',Staff)

app.listen(process.env.PORT || 9870 ,() =>{
    console.log("server is running in port 9870");
})