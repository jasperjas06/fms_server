import mongoose from "mongoose";
import Joi from 'joi'


// (Register Number, name, batch or class, course, section, department, date of registration, email and password)

const Student=mongoose.model('Student',new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    RegNo:{
        type: String,
        required: true,
        uppercase: true,
        unique: true
    },
    Section:{
        type: String,
        default:"A"
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
    date: {
        type: Date,
        default: Date.now
      },
      isCashier:{
        type: Boolean,
        default: false
      }
}));

const validateStudent= (value) => {
    const schema = Joi.object({
      name: Joi.string().min(3),
      RegNo:Joi.string(),
      // Course:Joi.string().min(3),
    //   batch:Joi.number().min(4),
    Section:Joi.string(),
    department:Joi.string(),
      email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
      password: Joi.string().required().min(4),

    });
    const result = schema.validate(value)
  
    return result  
  };

export default Student;

export {validateStudent}