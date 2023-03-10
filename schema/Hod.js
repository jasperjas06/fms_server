import mongoose from 'mongoose'
import Joi from 'joi'

const hodSchema={
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Department',
        required:true
    },
    isHod:{
        type:Boolean,
        default:true
    },   
}




const Hod=mongoose.model('Hod',hodSchema)
const validateHod = (value) => {
    const schema = Joi.object({
      name:Joi.string(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().required().min(3),
      department:Joi.string().required()
    
    });
    const result = schema.validate(value)
  
    return result  
  };

export default Hod
export {validateHod}