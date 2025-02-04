const express = require('express')
const { getAllPatients, getPatientsById, addPatients, UpdatePatients, DeletePatient } = require('../controller/patientsController')

const router = express.Router()

//routes

//GET all patients LIST || GET

router.get('/getAll',getAllPatients)

//get patientsById

router.get ('/getbyid/:id',getPatientsById)

//Create patients
router.post('/create',addPatients)

//Update Patients || PUT
router.put('/update/:id',UpdatePatients)

//Delete Patient || DELETE
router.delete('/delete/:id',DeletePatient)
module.exports=router