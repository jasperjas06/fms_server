import mongoose from "mongoose";

const config=async()=>{
   try {
  
   await mongoose.connect('mongodb://localhost:27017/kumardeptManage')
//   await mongoose.connect("mongodb+srv://kumar:kumar@cluster0.mp19l.mongodb.net/?retryWrites=true&w=majority")
    console.log("DBconected");
    
   } catch (error) {
    console.log("error",error);
   }
}

export default config;
