

const mySqlPool = require("../config/db")

//GET all patients list
const getAllPatients = async(req,res)=>{
try {
    const data = await mySqlPool.query("SELECT * FROM Patient")
    if(!data){
        return res.status(404).send({
            success:false,
            message:'no records found'
        })
    }res.status(200).send({
        success:true,
        message:'All Patients records',
        totalPatients:data[0].length,
        data : data[0]
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'error in get all Api',error
    })
    
}
}



//get by id
const getPatientsById = async(req,res)=>{
try {
    const Patient_Id = req.params.id
    if(!Patient_Id){
        return res.status(404).send({
           success:false,
           message:'Invalid or private patient id' 
        })
    }
// const data = await db.query(`SELECT * FROM Patient WHERE ID =`+patientsId)
const data = await mySqlPool.query(`SELECT * FROM Patient WHERE Patient_Id=?`,[Patient_Id])
if(!data){
    return res.status(404).send({
        success:false,
        message:'no Records Found'
    })
}
res.status(200).send({
    success:true,
    data:data[0]
})
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'error in getbyid',
        error
    })
    
}
}


//add patients

const addPatients = async (req,res)=>{
    try {
        const{Patient_Id,FirstName,LastName,DateOfBirth,Gender,Address,PhoneNumber,Email,EmergencyContact}=req.body
        if(!Patient_Id || !FirstName || !LastName || !DateOfBirth || !Gender || !Address || !PhoneNumber || !Email || !EmergencyContact){
            return res.status(500).send({
                success:false,
                message:"please provide all fields"
            })
        }
        const data = await mySqlPool.query('INSERT INTO Patient (Patient_Id,FirstName,LastName,DateOfBirth,Gender,Address,PhoneNumber,Email,EmergencyContact) VALUES (?,?,?,?,?,?,?,?,?)',[Patient_Id,FirstName,LastName,DateOfBirth,Gender,Address,PhoneNumber,Email,EmergencyContact])
        if(!data){
            return res.status(404).send({
                success:false,
                message:'Error in Insert Query'
            })
        }
        res.status(201).send({
            success:true,
            message:'New Patient Record Created'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in create Patients API',
            error
        })
        
    }
}

//Update Patient
const UpdatePatients = async(req,res)=>{
    try {
        const PatientId= req.params.id
        if(!PatientId){
            return res.status(404).send({
                success:false,
                message:'invalid Id or provide Id'
            })
        }
        const {FirstName,LastName,DateOfBirth,Gender,Address,PhoneNumber,Email,EmergencyContact}=req.body
        const data = await mySqlPool.query(`UPDATE Patient SET FirstName = ?,LastName = ?,DateOfBirth =?,Gender =? ,Address = ?,PhoneNumber =? ,Email = ?,EmergencyContact = ? WHERE Patient_Id=?`,[FirstName,LastName,DateOfBirth,Gender,Address,PhoneNumber,Email,EmergencyContact,PatientId])
        if(!data){
            return res.status(500).send({
                success:false,
                message:'Error in update data'
            })
        }
        res.status(200).send({
            success:true,
            message:'update data successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'error in update patients API',
            error
        })
        
    }
}


// DeletePatient
const DeletePatient = async(req,res)=>{
    try {
        const PatientId= req.params.id
        if(!PatientId){
            return res.status(404).send({
                success:false,
                message:'invalid Id or provide Id'
            })
        }
        await mySqlPool.query(`DELETE FROM Patient WHERE Patient_id= ?`,[PatientId]);
    
        res.status(200).send({
            success:true,
            message:'Patient deleted successfully'
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:'error in delete Patient API',
            error
        })

        
    }

}

module.exports ={getAllPatients,getPatientsById,addPatients,UpdatePatients,DeletePatient}