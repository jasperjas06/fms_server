import mongoose from 'mongoose'
import Joi from 'joi'

const departmentSchema={
    department:{
        type:String,
        required:true
    }   
}




const Department=mongoose.model('Department',departmentSchema)
const validateDepartment = (value) => {
    const schema = Joi.object({
        department:Joi.string(),
    });
    const result = schema.validate(value)
  
    return result  
  };

export default Department
export {validateDepartment}