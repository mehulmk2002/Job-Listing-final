const mongoose=require('mongoose')


const jobsSchema=mongoose.Schema({
    companyName:{type:String,
        required:true
        },

        addLogoURL:{type:String,
            required:true
            },

            jobPosition:{type:String,
            required:true
            },

            monthlySalary:{type:String,
        required:true
        },

    jobType:{type:String,
        required:true
        },  

        remoteOnsite:{type:String,
        required:true
        },  

        jobLocation:{type:String,
        required:true
        },  

        jobDescription:{type:String,
        required:true
        },  

        aboutCompany:{type:String,
        required:true
        },  

        skillsRequired:{type:Array,
        required:true
        },  

    information:{type:String,
        required:true
        }, 
})

const jobs=new mongoose.model('Job',jobsSchema)

module.exports=jobs;