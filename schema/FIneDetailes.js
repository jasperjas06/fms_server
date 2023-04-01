import mongoose from "mongoose";
import Joi from 'joi'

const FineDetaile=mongoose.model('FineDetaile',new mongoose.Schema({
   fine:{
    type:String,
    required:true
   },
   amount:{
    type:Number,
    required:true
   }
}));

const validateFineDetailes = (value) => {
    const schema = Joi.object({
        fine:Joi.required(),
        amount:Joi.required(),
    });
    const result = schema.validate(value)
  
    return result  
  };

export default FineDetaile;

export {validateFineDetailes}
