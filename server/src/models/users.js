const mongoose =require('mongoose')
//schema
const userSchema=new mongoose.Schema({
    name:{type:String,
            required:true,
            trim:true
            },
    email:{type:String,
            required:true,
            trim:true
            },
    mobile:{type:String,
            required:true,
            trim:true
            },
    password:{type:String,
              required:true,
              },
            
})
//collection
const Users=new mongoose.model('User',userSchema)

module.exports=Users;