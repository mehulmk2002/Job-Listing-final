const express = require('express');
const dotenv=require('dotenv')
const bcrypt = require('bcrypt');

const cors=require('cors');
const jwt = require('jsonwebtoken');
require('../src/db/conn')
const Users= require('../src/models/users')
const Jobs= require('../src/models/jobs');
const jobs = require('../src/models/jobs');
const app=express();
const port=process.env.PORT || 4000;
dotenv.config();
app.use(express.json())
app.use(cors());

const isAuthenticated = (req, res, next) => {
    try {next();
      const user = jwt.verify(req.headers.token, process.env.JWT_SECRET) 
      req.user = user
      next();
    } catch (error) {
      res.send ({status: 'FAILED', message: 'Please login first' })
    }
  }

  app.get('/login', async (req, res) => {
    try {
      const { email, password } = req.body;
  console.log(email, password)
      const userInDB = await Users.findOne({email})
    //  res.send(userInDB)
      if(!userInDB) {
        return res.send({ status: 'FAILED', message: 'Cannot find user. Please sign up!' })
      }
  
      const passwordMatched = await bcrypt.compare(password, userInDB.password);
      if(passwordMatched) {
        const jwtToken = jwt.sign(userInDB.toJSON(), process.env.JWT_SECRET, { expiresIn: 60 });
  
        res.send({ status: 'SUCCESS', message: 'User logged in successfully', jwtToken,userInDB })
      } else {
        res.send({ status: 'FAILED', message: 'Invalid credentials' })
      }
    } 
    catch (error) {
      res.send({ status: 'FAILED', message: 'Failed to sign in user' })
      console.log(error)
     }
  }
  );


  app.post('/signup',async(req,res)=>{
    try{
        const {name,email,mobile,password}=req.body;
      
        const isExit=await Users.findOne({email})
        if(isExit)
        {
            console.log("already there")
            res.send({name:isExit.name,email:isExit.email})
        }
        else{
            const encryptedpswd=await bcrypt.hash(password,10)
            Users.create({name,email,mobile,password:encryptedpswd})

            const jwtToken = jwt.sign({name,email,mobile,password:encryptedpswd}, process.env.JWT_SECRET, { expiresIn: 60 });

            res.send({ status: 'SUCCESS', message: 'User signed up successfully', jwtToken })

            console.log("Insert SUCCESSFULLY")
        } }
    catch(error){
        console.log(error)
    }
 
})




app.get('/',isAuthenticated,(req,res)=>{
    res.send({status:'SUCCESS', msg:'All Good',userDetail:req.user})
})


app.get('/Getjob',async(req,res)=>{

try{

  jobs.find().then((JobList)=>{
    res.send({JobList});
}).catch((error)=>{console.log(error)})

}
catch(error){
  console.log(error)
}
})


app.get('/GetJob/:job_id',async(req,res)=>{

  const {job_id}=req.params
  const jonInfo = await Jobs.findById(job_id)

console.log(jonInfo) 
res.send(jonInfo)
})




app.post('/Addjob',async(req,res)=>{
    try{
        const {companyName,
          addLogoURL,
          jobPosition,
          monthlySalary,
          jobType,
          remoteOnsite,
          jobLocation,
          jobDescription,
          aboutCompany,
          information,skillRequired
          }=req.body;
      
      console.log(companyName,
        addLogoURL,
        jobPosition,
        monthlySalary,
        jobType,
        remoteOnsite,
        jobLocation,
        jobDescription,
        aboutCompany,
        information,
        skillRequired);
        //skillsRequired = skillRequired.split(',');
      let skillsRequired=skillRequired;

          const newLocal = Jobs.create({
        companyName,
        addLogoURL,
        jobPosition,
        monthlySalary,
        jobType,
        remoteOnsite,
        jobLocation,
        jobDescription,
        aboutCompany,
        information,
        skillsRequired
      });
console.log('Add Successfully')
            }
    catch(error){
        console.log(error)
    }
 
})


app.patch('/UpdateJob/:id', async (req, res) => {
  try {
    const jobId = req.params.id;
    const {
      companyName,
      addLogoURL,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOnsite,
      jobLocation,
      jobDescription,
      aboutCompany,
      information,
      skillRequired
    } = req.body;

    const updatedJob = {
      companyName,
      addLogoURL,
      jobPosition,
      monthlySalary,
      jobType,
      remoteOnsite,
      jobLocation,
      jobDescription,
      aboutCompany,
      information,
      skillsRequired: skillRequired.split(','), 
    };

    const updatedJobDocument = await Jobs.findByIdAndUpdate(jobId, updatedJob, { new: true });

    if (!updatedJobDocument) {
      return res.status(404).json({ error: 'Job not found' });
    }

    console.log('Update Successful');
    res.status(200).json({ message: 'Update Successful', updatedJob: updatedJobDocument });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



app.post('/user',async(req,res)=>{
    try{

    //     console.log('user Req')
    //    const addUser=new Users(req.body)
    //     console.log(req.body)
    //     addUser.save()
    }
    catch(e){
        res.send(e)
        console.log(e)
    }
})






app.listen(port,()=>{
    console.log(`Connection is live at port no. ${port}`)
})