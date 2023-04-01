import mongoose from "mongoose";
import Joi from 'joi'

const Staff=mongoose.model('Staff',new mongoose.Schema({
  
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    department:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Department',
        required:true
    },
    isStaff:{
        type: Boolean,
        default: true
    },
    isCashier:{
        type:Boolean,
        default:true
    }

}));

const validateStaff = (value) => {
    const schema = Joi.object({
      name:Joi.string(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().min(3),
      department:Joi.string().required()
    });
    const result = schema.validate(value)
  
    return result  
  };


export default Staff;
export {validateStaff}