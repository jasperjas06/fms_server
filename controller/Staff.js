import Staff,{validateStaff} from '../schema/Staff.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'


const register = async(req,res) =>{
    const email = req.body.email
    const {error}=validateStaff(req.body)
    const password='staff@fms'
    try {
    //    console.log(password);
    if(error) return res.status(400).send(error.details[0].message);
    const exUser=await Staff.findOne({email: email})
    if(exUser){
        res.send("email is already taken")
    }
    else{
        // console.log(password);
        let hashpassword =await bcrypt.hash('staff@fms',10)
        let user=new Staff({
            name:req.body.name,
            email:req.body.email,
            password:hashpassword,
            department:req.body.department,
            isStaff:true
        })
        const result=await user.save()
        res.send("Staff created")

    }
   } catch (error) {
    res.status(400).send(message.error)
   }
}


const Login = async(req, res) => {
    try {
        // console.log( req.body.email);
        let userData=await Staff.findOne({email: req.body.email});
        if (!userData) {
            return res.status(400).send("email not found")
        }
        let validpassword =await bcrypt.compare(req.body.password,userData.password)
       if(!validpassword) {
        return res.status(400).send("not a valid password")
       }
       const id=userData._id
       const staff=userData.isStaff
       const cashier=userData.isCashier
    
      const userToken =await jwt.sign({id:id,isStaff:staff,isCashier:cashier},process.env.JWTKEY);

      res.header('auth',userToken).send(userToken)
    } catch (error) {
        res.status(400).send(error.message)
    }
}
export default {register,Login}