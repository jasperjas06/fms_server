
// import Hod,{validateHod} from '../schema/Hod.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import Admin, { validateAdmin } from '../schema/Admin.js'
import Department, { validateDepartment } from '../schema/Department.js'
import Hod from '../schema/Hod.js'
import Staff from '../schema/Staff.js'
import Student from '../schema/Student.js'
import FineDetaile, { validateFineDetailes } from '../schema/FIneDetailes.js'


const register = async(req,res) =>{
    const email = req.body.email
    const {error}=validateAdmin(req.body)
   try {
    if(error) return res.status(400).send(error.details[0].message);
 
    const exUser=await Admin.findOne({email: email})
    if(exUser){
        res.send("email is already exits")
    }
    else{
        let hash =await bcrypt.hash(req.body.password,10)
       
        let user=new Admin({
            name:req.body.name,
            email:req.body.email,
            password:hash,
            isAdmin:true
            // dept:req.body.dept
        })
        const result=await user.save()
        res.send(result)

    }
   } catch (error) {
    res.status(400).send(error.message)
   }
}


const Login = async(req, res) => {
    try {
        // console.log( req.body.email);
        let mail= req.body.email;
        let exAdmin = await Admin.findOne({email:mail});
        let hod = await Hod.findOne({email:mail});
        let staff = await Staff.findOne({email:mail});
        let student = await Student.findOne({email:mail});
        if(exAdmin){
            let validpassword =await bcrypt.compare(req.body.password,exAdmin.password)
            if(!validpassword) {
                return res.status(400).send("not a valid password")
               }
               const id=exAdmin._id
               const admin=exAdmin.isAdmin
              const userToken =jwt.sign({ id: id, isAdmin: admin }, process.env.JWTKEY);
              res.header('auth',userToken).send(userToken)
        } else if(hod){
            let validpassword =await bcrypt.compare(req.body.password,hod.password)
            if(!validpassword) {
                return res.status(400).send("not a valid password")
               }
               const id=hod._id
               const hod1=hod.isHod
              const userToken =jwt.sign({ id: id, isHod: hod1 }, process.env.JWTKEY);
              res.header('auth',userToken).send(userToken)
        } else if(staff){
            let validpassword =await bcrypt.compare(req.body.password,staff.password)
                if(!validpassword) {
                    return res.status(400).send("not a valid password")
                   }
                   const id=staff._id
                   const staff1=staff.isStaff
                   const cashier= staff.isCashier
                  const userToken =jwt.sign({ id: id, isStaff: staff1, isCashier:cashier }, process.env.JWTKEY);
                  res.header('auth',userToken).send(userToken)
        } else if(student){
            let validpassword =await bcrypt.compare(req.body.password,student.password)
            if(!validpassword) {
                return res.status(400).send("not a valid password")
               }
               const id=student._id
               const RegNo=student.RegNo
               const cashier= student.isCashier
              const userToken =jwt.sign({ id: id, regNo: RegNo, isCashier:cashier }, process.env.JWTKEY);
              res.header('auth',userToken).send(userToken)
        }else{ return res.status(400).send("email not found") }
       
    } catch (error) {
        res.status(400).send(error.message)
    }
}

const createDep = async(req,res) =>{
    const department = req.body.department
    const {error}=validateDepartment(req.body)
   try {
    if(error) return res.status(400).send(error.details[0].message);
 
    const exUser=await Department.findOne({department: department})
    if(exUser){
        res.send("Department already exits")
    }
    else{
        // let hash =await bcrypt.hash(req.body.password,10)
       
        let user=new Department({
            department : req.body.department
        })
        const result=await user.save()
        res.send(result)

    }
   } catch (error) {
    res.status(400).send(error.message)
   }
}

const getDep= async(req,res)=>{
    let  data= await Department.find()
    try {
        if(!data){
            return res.status(400).send(error.details[0].message); 
        }else
        res.send({message:"Data",data:data})
    } catch (error) {
        console.log(error);
    }
}

const crtFine = async(req,res)=>{
    let fine = req.body.fine;
    const {error}=validateFineDetailes(req.body)
    try {
        if(error) return res.status(400).send(error.details[0].message);
 
    const exFine=await FineDetaile.findOne({fine: fine})
    if(exFine){
        res.send("Fine already exits")
    }
    else{
    let newFine= new FineDetaile({
        fine:fine,
        amount:req.body.amount
    })
    let result = newFine.save()
    console.log(result);
    res.send({message:"Fine Created"})
}
    } catch (error) {
     console.log(error);   
    }

}

const getFine= async(req,res)=>{
    let  data= await FineDetaile.find()
    try {
        if(!data){
            return res.status(400).send(error.details[0].message); 
        }else
        res.send({message:"Data",data:data})
    } catch (error) {
        console.log(error);
    }
}

export default {register,Login, createDep, getDep,crtFine,getFine}