const express = require ('express')
const morgan = require ('morgan')
// const dotenv = require ('dotenv')
const mySqlPool = require("./config/db")


//configure dotenv
// dotenv.config();


//rest object
const app = express()

//middleware
app.use(express.json())
app.use(morgan("dev"));

//routes
app.use('/api/v1/patients',require('./routes/patientsRoutes'))
app.use('/api/v1/getbyid',require('./routes/patientsRoutes'))
app.use('/api/v1/addpatient',require('./routes/patientsRoutes'))
app.use('/api/v1/updatePatient',require('./routes/patientsRoutes'))
app.use('/api/v1/deletePatient',require('./routes/patientsRoutes'))

app.get('/test',(req,res)=>{
    res.status(200).send('<h1>Nodejs mysql App</h1>')
})

//PORT
const PORT = 8000;

//conditionaly Listen
mySqlPool.query('SELECT 1').then(()=>{
//mysql
console.log('mysql db connected')
//listen
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`);
    
});
}).catch((error)=>{
    console.log(error);
    
})

