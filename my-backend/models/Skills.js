import mongoose from "mongoose";


const skisSchema = new mongoose.Schema({
    name: String,
    level: String,
    experience: String 
})

export default mongoose.model('Skills', skisSchema);