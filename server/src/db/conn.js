const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config();
mongoose.connect(process.env.MongoDB_URL).then(()=>{
    console.log("Conection SUCCESSFUL-atlas")
}).catch(error=>console.log(error))  
